import { 
  findAlluser,
  createUser,
  findUserByLogin,
  updateRefreshToken,
  findUserByToken 
} from '../services/user.service.js';
import { response } from '../utils/responseJson.js';
import { hashedPassword, comparePassword } from '../utils/hash.js';
import { encodedToken } from '../auth/jwtToken.js';

const getAllUser = async (req, res) => {
  try {
    const data = await findAlluser();
    res.status(200).json(response('success', 200, 'get data success', data));
  } catch (error) {
    res.status(500).json(response('failed', 500, error.message, null));
  }
};

const registerUser = async (req, res) => {
  const {name, phoneNumber, password, confirmPassword} = req.body;

  if(!(name && phoneNumber && password && confirmPassword)) return res.status(400).json(response('failed', 400, 'data tidak boleh kosong', null));

  if(password !== confirmPassword) return res.status(400).json(response('failed', 400, 'password tidak sama', null));
        
  try {
    const hashPassword = hashedPassword(password);
    await createUser(req.body, hashPassword);
    res.status(201).json(response('success', 201, 'register success', null));
  } catch (error) {
    res.status(400).json(response('failed', 400, 'nomor telepon sudah terdaftar', null));
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const data = await findUserByLogin(body);
    if (!data) return res.status(400).json(response('failed', 400, 'Nomor telepon tidak terdaftar', null));

    const match = comparePassword(body.password, data.password);
    if (!match) return res.status(400).json(response('failed', 400, 'password salah', null));

    const SECRET_KEY_TOKEN = process.env.SECRET_KEY;
    const SECRET_KEY_REFRESH_TOKEN = process.env.SECRET_KEY_REFRESH_TOKEN;

    const token = encodedToken(data, SECRET_KEY_TOKEN, '30s');

    const refreshToken = encodedToken(data, SECRET_KEY_REFRESH_TOKEN, '1d');

    await updateRefreshToken(body.phoneNumber, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly : true,
      maxAge: 24 * 60 * 60 * 1000 //1 hari
    });

    res.status(200).json(response('success', 200, 'login success', {token}));
  } catch (error) {
    res.status(400).json(response('failed', 400, error.message, null));
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    
    const user = await findUserByToken(refreshToken);
    if(!user) return res.sendStatus(204);

    await updateRefreshToken(user[0].phoneNumber, null);

    res.clearCookie('refreshToken');
    res.status(200).json(response('success', 200, 'logout successfully', null));
  } catch (error) {
    res.status(500).json(response('failed', 500, error.message, null));
  }
};

export {getAllUser, registerUser, loginUser, logout};