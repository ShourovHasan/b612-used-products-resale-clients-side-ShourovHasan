import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import netlify from '../../../asssets/Social/netlify.png'

const ContactUs = () => {
    const form = useRef();
    // const navigate = useNavigate();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_1z619pv', 'template_7nhyg6h', form.current, 'xYEqqYxuWpuzvtzS1')
            .then((result) => {
                e.target.reset();
                toast.success('mail send successfully')
                // console.log(result.text);
                // navigate('/');
            }, (error) => {
                console.log(error.text);
            });
    };

    
    return (
        <div className="mt-5 mb-10">
            <h2 className='text-5xl font-bold text-center divider text-primary divider-primary'>Contact US</h2>
            <div className='mt-8 hero'>
                <div className='flex-col hero-content lg:flex-row'>
                    <div className='w-full mx-auto card lg:w-1/2'>
                        <div className="flex flex-col p-5 mx-auto text-xl card-body">
                            <h2 className='mt-5 text-4xl font-bold mb-7 text-primary'>Get in touch</h2>
                            <div className='w-2/3 lg:w-full'>
                                <p>For any reports or queries comes, we are always open to solve this. Contact us at any time!</p>
                            </div>
                            <div className="flex">
                                <div className="font-bold ">
                                    <p>Phone:</p>
                                    <p>Email:</p>
                                    <p>Address:</p>
                                </div>
                                <div className="ml-1">
                                    <p>+8801786558637</p>
                                    <p>shourovhasan91@gmail.com</p>
                                    <p>Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <h3 className='mt-5 text-3xl'>Social Media</h3>
                            <div className="flex flex-row gap-5 mx-10 mt-3">
                                <a href='https://github.com/ShourovHasan' target="_blank" rel="noopener noreferrer" aria-label='Github'><FaGithub className='text-xl duration-300 ease-in-out hover:text-2xl hover:text-base-300'></FaGithub></a>

                                <a href='https://www.linkedin.com/in/md-shourov-hasan/' target="_blank" rel="noopener noreferrer" aria-label='LinkedIn'><FaLinkedinIn className='text-xl duration-300 ease-in-out hover:text-2xl hover:text-base-300'></FaLinkedinIn></a>

                                <a href='https://app.netlify.com/teams/shourovhasan/overview' target="_blank" rel="noopener noreferrer" aria-label='Netlify'><img src={netlify} className='w-5 duration-300 ease-in-out hover:w-7' alt='' /></a>

                                <a href='https://www.facebook.com/shasan74/' target="_blank" rel="noopener noreferrer" aria-label='Facebook'><FaFacebookF className='text-xl duration-300 ease-in-out hover:text-2xl hover:text-base-300'></FaFacebookF></a>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center w-11/12 shadow-sm lg:w-1/2 shadow-primary rounded-xl'>
                        <form ref={form} onSubmit={sendEmail} className='flex flex-col mx-auto card-body'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text" name='user_name' placeholder="your name" className="input input-bordered border-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='user_email' placeholder="your email" className="input input-bordered border-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea name='message' placeholder="write your valuable message here" className="h-20 input input-bordered border-primary" required />
                            </div>
                            <div className="mt-2 form-control">
                                <input type="submit" className="text-white btn btn-outline border-primary bg-gradient-to-r from-secondary to-primary" value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default ContactUs;
