import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password1', 10),
    isAdmin: true,
  },
  {
    name: 'Megan OB',
    email: 'megan@example.com',
    password: bcrypt.hashSync('password1', 10),
    isMentor: true
  },
  {
    name: 'Lee Roy',
    email: 'lee@example.com',
    password: bcrypt.hashSync('password1', 10),
  },
]

export default users