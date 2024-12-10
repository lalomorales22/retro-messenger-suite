import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-win95-gray">
      <div className="window-95-btn p-8 max-w-md w-full">
        <h1 className="text-2xl mb-6 font-bold text-center">RetroMessenger</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: 'light',
            style: {
              button: {
                background: '#c0c0c0',
                border: '2px solid #000',
                borderRadius: '0',
                boxShadow: 'inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf',
              },
              input: {
                background: '#fff',
                border: '2px solid #000',
                borderRadius: '0',
                boxShadow: 'inset -1px -1px #fff,inset 1px 1px grey,-1px -1px #dfdfdf,1px 1px #0a0a0a',
              },
            },
          }}
          providers={["google", "github"]}
        />
      </div>
    </div>
  );
};

export default AuthPage;