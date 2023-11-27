import { login } from '../slices/authSlice'

export const handleLogin = (username, passsword) => async (dispatch, getState) => {
  try {
    const payload = {
      username,
      passsword,
    }

    const token =
      'xcvjdhjj.sad.asdfsdafertregdgfdghrtghchn.hn.rn.chy6jh6y.hg.yh.y.thyyhtn..yhy.t.cdytcjuvyhjsdgctbuuy4783begfsdjcsdvbuegpjdsbvjhgbdfjlsvbhjlasdbfvjlgbu'
    const name = 'Tom'
    const id = 1

    const results = {
      token,
      name,
      id,
    }

    dispatch(login(results))
  } catch (error) {
    console.log(error)
  }
}
