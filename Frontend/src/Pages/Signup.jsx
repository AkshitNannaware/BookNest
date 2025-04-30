// import React, { useState } from 'react';
// import { Eye, EyeOff, Upload, User, Mail, Lock, Building2, UserCircle, Shield } from 'lucide-react';

// const Signup = () => {
//   // const [formData, setFormData] = useState({
//   //   name: '',
//   //   email: '',
//   //   password: '',
//   //   role: 'student',
//   //   photo: null
//   // });
//   const [formData, setFormData] = useState({
//     username: '',     // ✅ correct
//     email: '',
//     password: '',
//     role: 'student',
//     photo: null
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.photo) {
//   //     alert("Please fill in all the fields and upload a photo.");
//   //     setLoading(false);
//   //     return;
//   //   }

//   //   const submitData = new FormData();
//   //   Object.keys(formData).forEach(key => {
//   //     submitData.append(key, formData[key]);
//   //   });

//   //   try {
//   //     console.log('Signup Data:');
//   //     console.log('Name:', formData.name);
//   //     console.log('Email:', formData.email);
//   //     console.log('Password:', formData.password);
//   //     console.log('Role:', formData.role);
//   //     console.log('Photo:', formData.photo ? formData.photo.name : 'No photo uploaded');
//   //   } catch (error) {
//   //     console.error('Signup error:', error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     if (!formData.name || !formData.email || !formData.password || !formData.role || !formData.photo) {
//       alert("Please fill in all the fields and upload a photo.");
//       setLoading(false);
//       return;
//     }
  
//     const submitData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       submitData.append(key, formData[key]);
//     });
  
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         body: submitData,
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         alert("Account created successfully!");
//         console.log("Signup success:", result);
//         // Redirect to login page or dashboard
//         window.location.href = "/login";
//       } else {
//         alert(result.msg || "Signup failed. Please try again.");
//         console.error("Signup error:", result);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//           <p className="mt-2 text-gray-600">Join us and start your journey</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             <div className="grid grid-cols-3 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'student' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'student'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <UserCircle className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Student</p>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'owner' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'owner'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <Building2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Owner</p>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'admin' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'admin'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <Shield className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Admin</p>
//               </button>
//             </div>

//             <div className="flex justify-center">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//                   {previewImage ? (
//                     <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User className="w-10 h-10 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//                 <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
//                   <Upload className="w-4 h-4" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>
//             </div>

           
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//             </div>

           
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Create a password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

           
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;









// import React, { useState } from 'react';
// import { Eye, EyeOff, Upload, User, Mail, Lock, Building2, UserCircle, Shield } from 'lucide-react';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'student,owner,admin',
//     photo: null
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { username, email, password, role, photo } = formData;

//     // if (!formData.username || !formData.email || !formData.password || !formData.role || !formData.photo) {
//     //   alert("Please fill in all the fields and upload a photo.");
//     //   setLoading(false);
//     //   return;
//     // }

//     if (!username || !email || !password || !role || !photo) {
//       alert("Please fill in all the required fields.");
//       setLoading(false);
//       return;
//     }
    

//   //   const submitData = new FormData();
//   // submitData.append("username", username);
//   // submitData.append("email", email);
//   // submitData.append("password", password);
//   // submitData.append("role", role);
//   // submitData.append("photo", photo); // ✅ file must be added like this


//     // const submitData = new FormData();
//     // Object.keys(formData).forEach((key) => {
//     //   submitData.append(key, formData[key]);
//     // });

//     const submitData = new FormData();
// Object.keys(formData).forEach((key) => {
//   if (key === "photo" && !formData.photo) return; // skip if no photo
//   submitData.append(key, formData[key]);
// });


//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         body: submitData,
//       });

//       const result = await response.json();
//       console.log("Backend Response:", result); // Log the backend response

//       if (response.ok) {
//         alert("Account created successfully!");
//         console.log("Signup success:", result);
//         window.location.href = "/login";
//       } else {
//         alert(result.msg || "Signup failed. Please try again.");
//         console.error("Signup error:", result);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//           <p className="mt-2 text-gray-600">Join us and start your journey</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-3 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'student' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'student'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <UserCircle className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Student</p>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'owner' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'owner'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <Building2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Owner</p>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setFormData({ ...formData, role: 'admin' })}
//                 className={`p-3 rounded-xl border-2 transition-all ${formData.role === 'admin'
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-blue-200'
//                   }`}
//               >
//                 <Shield className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                 <p className="text-sm font-medium">Admin</p>
//               </button>
//             </div>

//              <div className="flex justify-center">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//                   {previewImage ? (
//                     <img src={previewImage || "/default.jpg"} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User className="w-10 h-10 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//                 <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
//                   <Upload className="w-4 h-4" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>
//             </div> 

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Create a password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;










// import React, { useState } from 'react';
// import { Eye, EyeOff, Upload, User, Mail, Lock, Building2, UserCircle, Shield } from 'lucide-react';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'student', // ✅ Corrected default role
//     photo: null,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setFormData({ ...formData, photo: file });

//       const imageURL = URL.createObjectURL(file);
//       setPreviewImage(imageURL);

//       // Optional: Clean up object URL
//       return () => URL.revokeObjectURL(imageURL);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { username, email, password, role, photo } = formData;

//     if (!username || !email || !password || !role || !photo) {
//       alert("Please fill in all the required fields.");
//       setLoading(false);
//       return;
//     }

//     const submitData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "photo" && !formData.photo) return;
//       submitData.append(key, formData[key]);
//     });

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         body: submitData,
//       });

//       const result = await response.json();
//       console.log("Backend Response:", result);

//       if (response.ok) {
//         alert("Account created successfully!");
//         window.location.href = "/login";
//       } else {
//         alert(result.msg || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
//           <p className="mt-2 text-gray-600">Join us and start your journey</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-3 gap-3">
//               {["student", "owner", "admin"].map((roleOption) => (
//                 <button
//                   key={roleOption}
//                   type="button"
//                   disabled={loading}
//                   onClick={() => setFormData({ ...formData, role: roleOption })}
//                   className={`p-3 rounded-xl border-2 transition-all ${
//                     formData.role === roleOption
//                       ? 'border-blue-500 bg-blue-50'
//                       : 'border-gray-200 hover:border-blue-200'
//                   }`}
//                 >
//                   {roleOption === "student" && (
//                     <>
//                       <UserCircle className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                       <p className="text-sm font-medium">Student</p>
//                     </>
//                   )}
//                   {roleOption === "owner" && (
//                     <>
//                       <Building2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                       <p className="text-sm font-medium">Owner</p>
//                     </>
//                   )}
//                   {roleOption === "admin" && (
//                     <>
//                       <Shield className="h-5 w-5 mx-auto mb-1 text-blue-500" />
//                       <p className="text-sm font-medium">Admin</p>
//                     </>
//                   )}
//                 </button>
//               ))}
//             </div>

//             <div className="flex justify-center">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//                   {previewImage ? (
//                     <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User className="w-10 h-10 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//                 <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
//                   <Upload className="w-4 h-4" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="pl-10 w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Create a password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;









import React, { useState } from 'react';
import { Eye, EyeOff, Upload, UserCircle, Building2, Shield } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student', // Default role
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password || !formData.role || !formData.photo) {
      alert("Please fill in all the fields and upload a photo.");
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        alert(result.msg || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Join us and start your journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-3">
              {["student", "owner", "admin"].map((roleOption) => (
                <button
                  key={roleOption}
                  type="button"
                  disabled={loading}
                  onClick={() => setFormData({ ...formData, role: roleOption })}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    formData.role === roleOption
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {roleOption === "student" && (
                    <>
                      <UserCircle className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-sm font-medium">Student</p>
                    </>
                  )}
                  {roleOption === "owner" && (
                    <>
                      <Building2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-sm font-medium">Owner</p>
                    </>
                  )}
                  {roleOption === "admin" && (
                    <>
                      <Shield className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-sm font-medium">Admin</p>
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-colors">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;