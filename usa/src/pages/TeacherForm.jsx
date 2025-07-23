import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase/supabaseClient";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  observed_addiction: yup.string().required("This field is required"),
  noticed_behavior_changes: yup.string().required("This field is required"),
  address_distractions: yup.string().required("This field is required"),
  observed_substance_use: yup.string().required("This field is required"),
  participate_counseling: yup.string().required("This field is required"),
  interested_adadc: yup.string().required("This field is required"),
});

export default function TeacherForm() {
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
        .from("teacher_surveys")
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
      <h2 className="text-2xl font-bold text-center mb-6">Teacher Survey</h2>

      <div className="mb-4">
        <label className="block mb-2">
          Have you observed signs of gadget addiction among students? (আপনি কি
          শিক্ষার্থীদের মধ্যে মোবাইল বা গ্যাজেট আসক্তির লক্ষণ দেখেছেন?)
        </label>
        <select
          {...register("observed_addiction")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>
        {errors.observed_addiction && (
          <p className="text-red-500">{errors.observed_addiction.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Have you noticed reduced focus or behavioral changes in students?
          (আপনি কি শিক্ষার্থীদের মনোযোগ কমে যাওয়া বা আচরণগত পরিবর্তন লক্ষ্য
          করেছেন?)
        </label>
        <select
          {...register("noticed_behavior_changes")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>
        {errors.noticed_behavior_changes && (
          <p className="text-red-500">
            {errors.noticed_behavior_changes.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          How do you address digital distractions in class? (আপনি কীভাবে ক্লাসে
          ডিজিটাল আসক্তি মোকাবিলা করেন?)
        </label>
        <select
          {...register("address_distractions")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="discussions">Class discussions</option>
          <option value="rules">Strict rules</option>
          <option value="activities">Alternative activities</option>
          <option value="other">Other methods</option>
        </select>
        {errors.address_distractions && (
          <p className="text-red-500">{errors.address_distractions.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Have you observed any signs of substance or gambling habits? (আপনি কি
          কখনো শিক্ষার্থীদের মাদক, ধূমপান বা জুয়ার অভ্যাস লক্ষ্য করেছেন?)
        </label>
        <select
          {...register("observed_substance_use")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="suspected">Suspected</option>
        </select>
        {errors.observed_substance_use && (
          <p className="text-red-500">
            {errors.observed_substance_use.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Do you participate in or support counseling/wellness sessions? (আপনি
          কি কাউন্সেলিং বা ওয়েলনেস সেশনে অংশগ্রহণ করেন বা সহায়তা করেন?)
        </label>
        <select
          {...register("participate_counseling")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
        </select>
        {errors.participate_counseling && (
          <p className="text-red-500">
            {errors.participate_counseling.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Are you interested in participating in the ADADC digital program?
          (আপনি কি ADADC প্ল্যাটফর্মে অংশগ্রহণ করতে আগ্রহী?)
        </label>
        <select
          {...register("interested_adadc")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>
        {errors.interested_adadc && (
          <p className="text-red-500">{errors.interested_adadc.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
      >
        Submit Survey
      </button>
    </form>
  );
}
