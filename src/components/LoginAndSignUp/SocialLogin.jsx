import { useGoogleLogin } from "@react-oauth/google";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

const SocialLogin = () => {
  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: (response) => {
  //     console.log("Send this to BackEnd : ", response.code);
  //   },
  //   flow: "auth-code",
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        // onClick={handleGoogleLogin}
        className=" bg-gray-300 py-2 px-2 rounded-full hover:bg-btn-100 hover:text-white hover:translate-y-0.5 hover:shadow-md/40 transition-all cursor-pointer"
      >
        <FaGoogle className="size-6" />
      </button>
      <button className=" bg-gray-300 py-2 px-2 rounded-full hover:bg-btn-100 hover:text-white hover:translate-y-0.5 hover:shadow-md/40 transition-all cursor-pointer">
        <FaFacebookF className="size-6" />
      </button>
      <button className=" bg-gray-300 py-2 px-2 rounded-full hover:bg-btn-100 hover:text-white hover:translate-y-0.5 hover:shadow-md/40 transition-all cursor-pointer">
        <FaTwitter className="size-6" />
      </button>
    </div>
  );
};

export default SocialLogin;
