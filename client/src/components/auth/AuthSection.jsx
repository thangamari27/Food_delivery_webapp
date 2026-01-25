import { useState } from "react";
import { authContent, inputFields ,authSocialProvider } from "@/utils/constant/admin/AuthConstant";
import { authStyles } from "@/utils/styles/AuthStyle"
import Login from "./Login"
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

function AuthSection() {
  const [page, setPage] = useState('login');
  const content = authContent;
  const styles = authStyles;

  return (
    <section className={styles.section}>
        {page === 'login' &&
            <Login 
                content={content}
                inputFields={inputFields}
                authSocialProvider={authSocialProvider}
                onNavigate={setPage}
                styles={styles}
            />
        }
        {page === 'signup' &&
            <Signup 
                content={content}
                inputFields={inputFields}
                authSocialProvider={authSocialProvider}
                onNavigate={setPage}
                styles={styles}
            />
        }
        {page === 'forgotPassword' &&
            <ForgotPassword 
                content={content}
                inputFields={inputFields}
                onNavigate={setPage}
                styles={styles}
            />
        }
    </section>
   )
}

export default AuthSection