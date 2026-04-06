import { useNavigate } from "react-router";
import Background from "../components/Background";
import RegisterLeft from "../components/RegisterPage/RegisterLeft";
import RegisterForm from "../components/RegisterPage/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { registerUser } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    login(result.user);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center relative overflow-hidden">
      <Background />
      <div className="w-full max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <RegisterLeft />
        <div className="flex justify-center">
          <RegisterForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Register;
