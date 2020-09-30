import React from "react";
import { useForm } from "react-hook-form";
import { useStateValue } from "../../ContextApi/StateProvider";

function Shipment() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [{ user }] = useStateValue();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        <input
          name="name"
          defaultValue={user?.name}
          ref={register({ required: true })}
          placeholder="Enter your name"
          className="form-control mt-4"
        />
        {errors.name && <span className="text-danger">Name is required</span>}

        <input
          name="email"
          defaultValue={user?.email}
          ref={register({ required: true })}
          className="form-control mt-4"
          placeholder="Enter your email"
        />
        {errors.name && <span className="text-danger">Email is required</span>}

        <input
          name="phone"
          ref={register({ required: true })}
          className="form-control mt-4"
          placeholder="Enter Mobile Number"
        />
        {errors.phone && (
          <span className="text-danger">Mobile Number is required</span>
        )}
        <input
          name="address"
          ref={register({ required: true })}
          className="form-control mt-4"
          placeholder="Enter address"
        />
        {errors.address && (
          <span className="text-danger">Address is required</span>
        )}
        <input type="submit" className="form-control mt-4" />
      </form>
    </div>
  );
}

export default Shipment;
