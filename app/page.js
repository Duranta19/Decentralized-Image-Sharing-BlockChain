import Image from 'next/image'
import Login from '../components/auth/login'
import Signup from '../components/auth/signup'

export default function Home() {
  var flag = false;
  return (
    <main>
      {flag? <Login /> : <Signup />}
    </main>
  )
}
