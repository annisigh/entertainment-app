// Import necessary libraries and functions
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdMovie } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../service/user.service";
import { Toaster } from "react-hot-toast";

//Creating a schema object using yup.object()
// Define validation schema using Yup
const schema = yup.object().shape({ //Adding a shape property to the schema object with two properties: email and password
	email: yup.string().email("Invalid email").required("Can't be empty"), //Defining validation rules for each property using yup.string()
	//Setting the email property to be required and a valid email address using
	password: yup.string().required("Can't be empty"),
	//Setting the password property to be required using yup.string().required("Can't be empty")
});

// Define the Login component
const Login = () => {

	//nitializing the navigate function using useNavigate, 
	//which allows for programmatically navigating to different routes.
	// Initialize navigate function from react-router-dom
	const navigate = useNavigate();


	//Initializing the register, handleSubmit, reset, and errors variables using the useForm hook.
	// Destructure methods and state from useForm hook
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		//Setting the resolver option of useForm to 
		//yupResolver(schema) to handle validation with Yup.
	} = useForm({
		resolver: yupResolver(schema), // Set resolver to handle validation with Yup
	});


	//Defining the onSubmit function to handle form submission:
	// Function to handle form submission
	const onSubmit = (data) => {
		//Calling the loginUser function from user.service 
		//with the form data and navigate function as arguments.
		loginUser(data, navigate); // Call loginUser function from user.service to handle login logic
		reset(); // Reset form fields //Calling reset() to reset the form fields.
	};
	// Render the Login component
	return (
		<div className="bg-leanBlue w-screen h-screen text-white flex flex-col justify-center items-center gap-10 p-3">
			<Toaster position="top-right" reverseOrder={false} />
			<MdMovie className="text-darkRed text-5xl md:text-6xl" />
			<div className="h-1/2 w-11/12 bg-deepBlue rounded-xl flex flex-col justify-evenly md:w-1/2 lg:w-1/4">
				<p className="text-HeadingL px-4 font-light">Login</p>
				<form
					key={"signUpForm"}
					onSubmit={handleSubmit(onSubmit)}
					className="w-full h-1/2 flex flex-col text-BodyM font-light justify-between items-center">
					{["email", "password"].map((inpTags, idx) => (
						<div
							key={inpTags + idx}
							className="relative w-11/12 h-10 mx-auto px-2 flex">
							<input
								key={inpTags}
								type={inpTags === "email" ? "email" : "password"}
								{...register(inpTags)}
								className={`w-full h-full bg-transparent focus:outline-none border-b-2 ${
									errors[inpTags] ? "border-red-500" : "border-waikawaGrey"
								} placeholder:text-waikawaGrey caret-darkRed`}
								placeholder={inpTags === "email" ? "Email address" : "Password"}
							/>
							{errors[inpTags] && (
								<p
									key={idx}
									className="absolute right-2 bottom-2 text-red-500 text-sm">
									{errors[inpTags].message}
								</p>
							)}
						</div>
					))}
					<button
						type="submit"
						className="bg-darkRed text-white text-center px-3 py-2 w-11/12 mx-auto rounded-md hover:bg-white hover:text-waikawaGrey">
						Login to an account
					</button>
				</form>
				<p className="text-center font-light">
					{"Don't have an account ?"}
					<span
						onClick={() => navigate("/signup")}
						className="text-darkRed cursor-pointer px-2">
						SignUp
					</span>
				</p>
			</div>
		</div>
	);
};

export default Login; // Export Login component
