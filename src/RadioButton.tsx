import * as React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export class RadioButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
      options: props.options,
      title: props.title
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  render() {
    const { onChange } = this.props;

    return (
      <div>
        {this.state.title}:
        <RadioGroup
          value={this.state.value}
          onChange={e => {
            this.handleChange(e);
            onChange(e);
          }}
          row
        >
          {this.state.options.map(val => (
            <FormControlLabel
              key={val}
              value={val}
              control={<Radio />}
              label={val}
            />
          ))}
        </RadioGroup>
      </div>
    );
  }
}
