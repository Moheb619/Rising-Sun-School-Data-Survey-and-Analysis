import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase/supabaseClient";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  child_too_much_time: yup.string().required("This field is required"),
  noticed_anxiety: yup.string().required("This field is required"),
  monitor_activities: yup.string().required("This field is required"),
  aware_counseling: yup.string().required("This field is required"),
  support_school_app: yup.string().required("This field is required"),
  participate_initiatives: yup.string().required("This field is required"),
});

export default function ParentForm() {
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
        .from("parent_surveys")
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
      <h2 className="text-2xl font-bold text-center mb-6">Parent Survey</h2>

      <div className="mb-4">
        <label className="block mb-2">
          Do you think your child spends too much time on mobile/internet? (আপনি
          কি মনে করেন আপনার সন্তান মোবাইল/ইন্টারনেটে বেশি সময় ব্যয় করে?)
        </label>
        <select
          {...register("child_too_much_time")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not_sure">Not sure</option>
        </select>
        {errors.child_too_much_time && (
          <p className="text-red-500">{errors.child_too_much_time.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Have you noticed anxiety, depression, or sleep issues in your child?
          (আপনি কি সন্তানের মধ্যে কোনো উদ্বেগ, বিষণ্ণতা বা ঘুমের সমস্যা লক্ষ্য
          করেছেন?)
        </label>
        <select
          {...register("noticed_anxiety")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>
        {errors.noticed_anxiety && (
          <p className="text-red-500">{errors.noticed_anxiety.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Do you monitor your child's online activities regularly? (আপনি কি
          সন্তানের অনলাইন কার্যক্রম নিয়মিত পর্যবেক্ষণ করেন?)
        </label>
        <select
          {...register("monitor_activities")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>
        {errors.monitor_activities && (
          <p className="text-red-500">{errors.monitor_activities.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Are you aware of any counseling or awareness program at the school?
          (আপনি কি জানেন স্কুলে কোনো কাউন্সেলিং বা সচেতনতা প্রোগ্রাম আছে?)
        </label>
        <select
          {...register("aware_counseling")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="not_sure">Not sure</option>
        </select>
        {errors.aware_counseling && (
          <p className="text-red-500">{errors.aware_counseling.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Would you support the use of a school app to track and support student
          wellness? (আপনি কি চাইবেন স্কুল একটি অ্যাপ ব্যবহার করুক শিক্ষার্থীদের
          সমস্যাগুলো জানার জন্য?)
        </label>
        <select
          {...register("support_school_app")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>
        {errors.support_school_app && (
          <p className="text-red-500">{errors.support_school_app.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Would you be interested in participating in school's anti-addiction
          initiatives? (আপনি কি স্কুলের ডিজিটাল অ্যাডিকশন প্রতিরোধ প্রোগ্রামে
          অংশগ্রহণ করতে চান?)
        </label>
        <select
          {...register("participate_initiatives")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>
        {errors.participate_initiatives && (
          <p className="text-red-500">
            {errors.participate_initiatives.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Submit Survey
      </button>
    </form>
  );
}
