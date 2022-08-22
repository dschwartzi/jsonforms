import * as React from "react";
import {
  mapDispatchToControlProps,
  mapStateToControlProps
} from "@jsonforms/core";
import { connect } from "react-redux";
import { RadioButton } from "./RadioButton";

const RadioControl = props => {
  const { schema, data, handleChange, path } = props;

  return (
    <div>
      <RadioButton
        title={schema.title}
        options={schema.enum}
        value={data}
        onChange={(ev: any) => handleChange(path, Number(ev.value))}
      />
    </div>
  );
};

export default connect(
  mapStateToControlProps,
  mapDispatchToControlProps
)(RadioControl as any);
