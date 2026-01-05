import { requireUnAuth } from "@/lib/auth-utils";
import { Signup } from '@/components/auth/signup'

const SignupPage = async () => {
  await requireUnAuth();
  
  return <Signup />
}

export default SignupPage
