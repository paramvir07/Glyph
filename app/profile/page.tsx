
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { profile } from "../actions/user.action";
const page = () => {
  return (
      <form className="m-9" action={ profile}>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name*</FieldLabel>
            <Input
              required
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Evil Rabbit"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username*</FieldLabel>
            <Input
              required
              id="username"
              name="username"
              autoComplete="off"
              placeholder="Evil Rabbit"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              required
              id="email"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Evil Rabbit"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="dob">Date of Birth* (mm/dd/yyyy)</FieldLabel>
            <Input
              required
              id="dob"
              name="dob"
              type="date"
              autoComplete="off"
              placeholder="Evil Rabbit"
            />
          </Field>
          <Field orientation="horizontal"></Field>
        </FieldGroup>
      </FieldSet>
      <button type="submit" className="bg-primary rounded-lg py-2 px-3">
        Submit
      </button>
    </form>
  );
};

export default page;
