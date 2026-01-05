import { requireUnAuth } from "@/lib/auth-utils";
import Login from '@/components/auth/login'

const LoginPage = async () => {
  await requireUnAuth();
  
  return <Login />
}

export default LoginPage
