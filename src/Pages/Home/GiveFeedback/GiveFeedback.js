import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../SharedPages/Loading/Loading';
import Lottie from "lottie-react";
import postImg from '../../../asssets/post.json';

const GiveFeedback = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    let navigate = useNavigate();
    const date = format(new Date(), "PPpp");

    const handleFeedback = data => {
        if (!user?.email) {
            toast.error("Please login first to give feedback");
            return navigate('/login');
        }
        const feedback = {
            userName: user?.displayName,
            userEmail: user?.email,
            feedbackTime: date,
            feedbackDescription: data.feedback
        }
        fetch('https://b612-used-products-resale-server-side-shourovhasan.vercel.app/feedback', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                // data.feedback.reset();
                toast.success(`feedback is added successfully`);
                navigate('/dashboard')
            })
    }
    return (
        <div className='my-16'>
            <h2 className='text-5xl font-bold text-center divider text-primary divider-primary'>Give Feedback</h2>
            <div className="mx-auto hero ">
                <div className="flex-col gap-20 mx-auto hero-content lg:flex-row md:flex-row">
                    <div className="w-11/12 text-center lg:w-1/3 lg:text-left md:w-1/3">
                        <Lottie loop={true} animationData={postImg} />
                    </div>
                    <div className="px-5 rounded-lg  shadow-neutral neumorphism_Banner_Card py-7 lg:w-[385px] md:w-[315px] w-full">
                        <form onSubmit={handleSubmit(handleFeedback)} className=''>
                            {/* <Header /> */}
                            <div className="w-full form-control">
                                <textarea {...register("feedback", {
                                    required: "feedback content is required"
                                })} type="text" placeholder="write your valuable feedback" className="w-full textarea textarea-bordered border-primary"></textarea>
                                {errors.feedback && <p role="alert" className='ml-4 text-red-500'>{errors.feedback?.message}</p>}
                            </div>
                            <input type="submit" className='w-full pb-0 mt-5 mb-0 text-white btn bg-gradient-to-r from-secondary to-primary' value='Feedback' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiveFeedback;