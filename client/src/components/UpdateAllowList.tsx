import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Button, TextInput } from "@tremor/react";
import axios from "axios";
import { useAccount } from "wagmi";

interface IFormInput {
  addresses: { address: string }[];
}

const UpdateAllowList: React.FC = () => {
  const { address: walletAddress } = useAccount();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      addresses: [{ address: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formattedData = {
      walletAddress,
      addresses: data.addresses.map((item) => item.address),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_URL}/update-allow-list`,
        formattedData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl text-gray-300 text-center font-bold mb-2">
          Update Allow List
        </h1>
        <h2 className="text-lg font-light mb-4 text-gray-400 text-center">
          Only authorized users can update allow list
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="flex flex-col spacy-y-4">
              <div
                key={field.id}
                className="flex items-center mb-2 justify-center"
              >
                <TextInput
                  className="form-input mt-1 block w-full"
                  {...register(`addresses.${index}.address` as const, {
                    required: "Address is required",
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: "Invalid Ethereum address",
                    },
                  })}
                  defaultValue={field.address}
                  placeholder="0x715c48a866dfFde0164020083f899fc4F04588ff"
                />
                {index > 0 && (
                  <Button
                    className="ml-4"
                    size="sm"
                    variant="secondary"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              {errors && (
                <div className="text-red-500">
                  {errors.addresses?.[index]?.address?.message}
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-5 justify-between mt-10">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => append({ address: "" })}
            >
              Add Address
            </Button>

            <Button
              type="submit"
              size="md"
              variant="primary"
              color="blue"
              disabled={!isValid}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAllowList;
