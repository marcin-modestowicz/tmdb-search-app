import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import TextInput from "./TextInput";

storiesOf("TextInput", module)
  .addDecorator(withKnobs)
  .add("simple", () => (
    <TextInput
      value={text("Value", "Sample text")}
      onChange={action("value changed")}
      onBlur={action("blur")}
      onFocus={action("focus")}
      onMouseEnter={action("mouse enter")}
      onMouseLeave={action("mouse leave")}
      autocomplete={boolean("Autocomplete", true)}
      autocorrect={boolean("Autocorrect", true)}
      autocapitalize={boolean("Autocapitalize", true)}
      spellcheck={boolean("Spellcheck", true)}
      autoFocus={boolean("AutoFocus", true)}
    />
  ))
  .add("with icon", () => (
    <TextInput
      value={text("Value", "Sample text")}
      onChange={action("value changed")}
      onBlur={action("blur")}
      onFocus={action("focus")}
      onMouseEnter={action("mouse enter")}
      onMouseLeave={action("mouse leave")}
      autocomplete={boolean("Autocomplete", true)}
      autocorrect={boolean("Autocorrect", true)}
      autocapitalize={boolean("Autocapitalize", true)}
      spellcheck={boolean("Spellcheck", true)}
      autoFocus={boolean("AutoFocus", true)}
      icon={
        <svg width="16" height="16" viewBox="0 0 300 300">
          <path
            d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z"
            fill="#76f19a"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              begin="0s"
              dur=".5s"
              fill="freeze"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      }
    />
  ));
