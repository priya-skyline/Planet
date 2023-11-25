import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import "../style/slider.css";

interface PersonalInfoInterface {
  name: string;
  email: string;
}

interface PersonalInfoInterface {
  name: string;
  email: string;
}

const defaultValue: PersonalInfoInterface = { name: "", email: "" };

const PersonalInfo = () => {
  const navigate = useNavigate();

  const getPersonalInfo = (): PersonalInfoInterface[] => {
    const data = localStorage.getItem("data");
    if (data) {
      const personalInfo: PersonalInfoInterface[] =
        JSON.parse(data)?.personalInfo;

      if (!personalInfo?.length) {
        return [defaultValue];
      }

      return personalInfo;

    }

    return [defaultValue];
  };

  const redirectToPlanet = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Formik
        initialValues={{
          slider: 50,
          personalInfo: getPersonalInfo(),
        }}
        onSubmit={(val) => {
          const values = {
            ...val,
            personalInfo: val.personalInfo.filter((info) => info.email && info.name)
          }
          localStorage.setItem("data", JSON.stringify(values, null, 2));
          redirectToPlanet();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray
              name="personalInfo"
              render={(arrayHelpers) => (
                <div className="persnol-form max-w-6xl mx-auto border-1 border-gray-300 rounded-lg p-12">
                  <h1 className="text-3xl">Personal Info</h1>
                  <div className="pb-5 pt-5">
                    <Field name="lastName">
                      {({ field }: FieldProps) => (
                        <Slider
                          {...field}
                          onValueChange={(v) => {
                            setFieldValue(field.name, v);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  {values.personalInfo.map((info, index) => (
                    <div key={index} className="flex items-center justify-center mb-5" >
                      <Field name={`personalInfo.${index}.name`} placeholder='Name' className='border border-solid border-gray-300 rounded-md mr-4 p-2 md:p-2 w-full' />
                      <Field name={`personalInfo.${index}.email`} placeholder='Email' className='border border-solid border-gray-300 rounded-md mr-4 p-2 md:p-2 w-full' />
                      <button className="flex bg-blue-500 text-white  rounded-md"
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <span className="text-lg py-1.5 px-5">-</span>
                      </button>
                    </div>
                  ))}

                  <button className="bg-blue-500 text-white py-2 px-6 leading-5  rounded-md"
                    type="button"
                    onClick={() => arrayHelpers.push(defaultValue)}
                  >
                    Add more info
                  </button>

                  <div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 leading-5 mt-2 rounded-md">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
