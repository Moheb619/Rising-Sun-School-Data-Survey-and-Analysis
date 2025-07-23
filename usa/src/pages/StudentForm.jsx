import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase/supabaseClient";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  age: yup.number().required("Age is required").positive().integer(),
  gender: yup.string().required("Gender is required"),
  grade: yup.string().required("Class is required"),
  device_hours: yup.number().required("This field is required").positive(),
  device_usage: yup.string().required("This field is required"),
  excessive_use: yup.string().required("This field is required"),
  skip_studies: yup.string().required("This field is required"),
  irritated_without_phone: yup.string().required("This field is required"),
  night_use: yup.string().required("This field is required"),
  tried_smoking_gambling: yup.string().required("This field is required"),
  feel_lonely: yup.string().required("This field is required"),
  share_problems: yup.string().required("This field is required"),
  interested_counseling: yup.string().required("This field is required"),
  desired_support: yup.string(),
  suggestions: yup.string(),
});

export default function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from("student_surveys")
        .insert([{ ...data }]);

      if (error) throw error;
      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Error submitting survey:", error.message);
      alert("Error submitting survey. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Student Survey</h2>

      {/* Demographic Info */}
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="px-2 font-semibold">Demographic Information</legend>

        <div className="mb-4">
          <label className="block mb-2">Your age (আপনার বয়স কত?)</label>
          <input
            type="number"
            {...register("age")}
            className="w-full p-2 border rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Your gender (আপনার লিঙ্গ কী?)</label>
          <select {...register("gender")} className="w-full p-2 border rounded">
            <option value="">Select</option>
            <option value="male">Male (ছেলে)</option>
            <option value="female">Female (মেয়ে)</option>
            <option value="other">Other (অন্যান্য)</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Your class (আপনি কোন শ্রেণিতে পড়ছেন?)
          </label>
          <input
            type="text"
            {...register("grade")}
            className="w-full p-2 border rounded"
          />
          {errors.grade && (
            <p className="text-red-500">{errors.grade.message}</p>
          )}
        </div>
      </fieldset>

      {/* Daily Routine and Device Use */}
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="px-2 font-semibold">
          Daily Routine and Device Use
        </legend>

        <div className="mb-4">
          <label className="block mb-2">
            How many hours do you use mobile/computer daily excluding study?
            (আপনি প্রতিদিন কত ঘণ্টা মোবাইল/কম্পিউটার ব্যবহার করেন (পড়াশোনা
            ছাড়া)?)
          </label>
          <input
            type="number"
            {...register("device_hours")}
            className="w-full p-2 border rounded"
          />
          {errors.device_hours && (
            <p className="text-red-500">{errors.device_hours.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            What do you mostly use your device for? (আপনি সাধারণত মোবাইল বা
            ইন্টারনেট কোন কাজে ব্যবহার করেন?)
          </label>
          <select
            {...register("device_usage")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="games">Games (গেম)</option>
            <option value="social_media">Social Media (সোশ্যাল মিডিয়া)</option>
            <option value="youtube">YouTube/Videos (ইউটিউব / ভিডিও)</option>
            <option value="online_classes">
              Online Classes (অনলাইন ক্লাস / পড়ালেখা)
            </option>
          </select>
          {errors.device_usage && (
            <p className="text-red-500">{errors.device_usage.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Do you use your phone more than you intend to? (আপনি কি আপনার ইচ্ছার
            চেয়ে বেশি সময় মোবাইল ব্যবহার করেন?)
          </label>
          <select
            {...register("excessive_use")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
          </select>
          {errors.excessive_use && (
            <p className="text-red-500">{errors.excessive_use.message}</p>
          )}
        </div>
      </fieldset>

      {/* Addiction & Behavioral Patterns */}
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="px-2 font-semibold">
          Addiction & Behavioral Patterns
        </legend>

        <div className="mb-4">
          <label className="block mb-2">
            Do you skip studies for gaming or YouTube? (আপনি কি স্কুল বা পড়ালেখা
            বাদ দিয়ে গেম বা ইউটিউবে ব্যস্ত থাকেন?)
          </label>
          <select
            {...register("skip_studies")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
          </select>
          {errors.skip_studies && (
            <p className="text-red-500">{errors.skip_studies.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Do you feel irritated or restless without your phone? (মোবাইল না
            পেলে কি আপনি রেগে যান বা অস্থির বোধ করেন?)
          </label>
          <select
            {...register("irritated_without_phone")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
          </select>
          {errors.irritated_without_phone && (
            <p className="text-red-500">
              {errors.irritated_without_phone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Do you use devices late at night that affect your sleep? (আপনি কি
            রাতে মোবাইল ব্যবহার করেন যার ফলে ঘুমের সমস্যা হয়?)
          </label>
          <select
            {...register("night_use")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
          </select>
          {errors.night_use && (
            <p className="text-red-500">{errors.night_use.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Have you ever tried smoking or online gambling? (আপনি কি কখনো
            ধূমপান, সিগারেট বা অনলাইন বাজি/জুয়া চেষ্টা করেছেন?)
          </label>
          <select
            {...register("tried_smoking_gambling")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.tried_smoking_gambling && (
            <p className="text-red-500">
              {errors.tried_smoking_gambling.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Emotional & Social Wellness */}
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="px-2 font-semibold">
          Emotional & Social Wellness
        </legend>

        <div className="mb-4">
          <label className="block mb-2">
            Do you often feel lonely, sad, or anxious? (আপনি কি প্রায় সময় একাকী,
            দুঃখিত বা উদ্বিগ্ন বোধ করেন?)
          </label>
          <select
            {...register("feel_lonely")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="sometimes">Sometimes</option>
          </select>
          {errors.feel_lonely && (
            <p className="text-red-500">{errors.feel_lonely.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Do you share your problems with friends or stay silent? (আপনি কি
            আপনার সমস্যা বন্ধুদের সাথে ভাগ করেন, নাকি চুপ থাকেন?)
          </label>
          <select
            {...register("share_problems")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="share">I share</option>
            <option value="stay_silent">I stay silent</option>
            <option value="sometimes">Sometimes share</option>
          </select>
          {errors.share_problems && (
            <p className="text-red-500">{errors.share_problems.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Would you be interested in a school wellness program or counseling?
            (আপনি কি স্কুলের কাউন্সেলিং বা ওয়েলনেস প্রোগ্রামে আগ্রহী?)
          </label>
          <select
            {...register("interested_counseling")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="maybe">Maybe</option>
          </select>
          {errors.interested_counseling && (
            <p className="text-red-500">
              {errors.interested_counseling.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Open-Ended Questions */}
      <fieldset className="border border-gray-300 p-4 rounded">
        <legend className="px-2 font-semibold">Open-Ended Questions</legend>

        <div className="mb-4">
          <label className="block mb-2">
            What kind of support or programs would you like from school? (আপনি
            স্কুল থেকে কী ধরণের সহায়তা বা প্রোগ্রাম পেতে চান?)
          </label>
          <textarea
            {...register("desired_support")}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            In your opinion, how can we reduce student digital addiction? (আপনার
            মতামত মতে, ছাত্র-ছাত্রীদের মোবাইল আসক্তি কমাতে কী করা উচিত?)
          </label>
          <textarea
            {...register("suggestions")}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit Survey
      </button>
    </form>
  );
}
