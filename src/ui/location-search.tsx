import { createMemo, createSignal, JSX } from "solid-js";
import { findStation } from "../functions/ojp";
import { Location } from "ojp-sdk";
import { Combobox } from "@kobalte/core/combobox";
import { DebouncerTimeout } from "../functions/debounce";

import classes from './location-search.module.css';

export function LocationSearch({ name, label, location, onChange }: {name: string, label: string, location?: Location, onChange: (location: Location | Location[] | null) => void}) {
	const [locations, setLocations] = createSignal<Location[]>([]);
	const debouncer = createMemo(() => DebouncerTimeout());

	const searchStation: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
		debouncer().debounce(() => {
			findStation((event.target as HTMLInputElement).value).then(setLocations);
		})
	}

	return (
    <Combobox
			closeOnSelection
			shouldFocusWrap
			allowsEmptyCollection
      options={locations()}
			value={location}
			optionLabel="locationName"
			optionValue="locationName"
			onChange={onChange}
      placeholder={label}
			defaultFilter={() => true}
			triggerMode="focus"
			id={name}
			name={name}
      itemComponent={props => (
        <Combobox.Item item={props.item} class={classes.item}>
          <Combobox.ItemLabel>{props.item.rawValue.locationName}</Combobox.ItemLabel>
        </Combobox.Item>
      )}
    >
      <Combobox.Control class={classes.control} aria-label="Station">
        <Combobox.Input class={classes.input} onInput={searchStation} />
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content class={classes.content}>
          <Combobox.Listbox class={classes.listbox} />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox>
  );
}