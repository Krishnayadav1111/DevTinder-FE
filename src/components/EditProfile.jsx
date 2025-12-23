import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditProfileMutation } from '../store/profileApi';

const EditProfile = ({ user }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editProfile, { isLoading, isSuccess, error }] = useEditProfileMutation();

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            setValue('photoUrl', user.photoUrl);
            setValue('age', user.age);
            setValue('gender', user.gender);
            setValue('about', user.about);
            // Handling skills usually requires more complex UI, 
            // skipping for simple text inputs or would need a tag input.
            // For now, let's just stick to the main profile fields as requested.
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        await editProfile(data);
    };

    return (
        <div className="card bg-base-200 shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input type="text" {...register('firstName', { required: true })} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input type="text" {...register('lastName')} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" {...register('photoUrl')} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Age</span>
                    </label>
                    <input type="number" {...register('age', { min: 18 })} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Gender</span>
                    </label>
                    <select {...register('gender')} className="select select-bordered w-full">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">About</span>
                    </label>
                    <textarea {...register('about')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>

                <div className="card-actions justify-center mt-6">
                    <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
                {isSuccess && <p className="text-success text-center mt-2">Profile updated successfully!</p>}
                {error && <p className="text-error text-center mt-2">Failed to update profile.</p>}
            </form>
        </div>
    );
};

export default EditProfile;
