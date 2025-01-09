import { createResource, createSignal, For, Match, Show, Switch } from 'solid-js'
import { LocationSearch } from './ui/location-search.tsx'
import { Location } from 'ojp-sdk'
import { searchTrips } from './functions/ojp.ts';
import { TripRow } from './ui/trip-row.tsx';
import { Spinner } from './ui/icons/spinner.tsx';

function App() {
  const [from, setFrom] = createSignal<Location>();
  const [to, setTo] = createSignal<Location>();
  const stations = () => ({ from: from(), to: to() });

  const [trips] = createResource(stations, ({ from, to }) => {
    if (!from || !to) {
      return [];
    }

    const date = new Date();
    date.setHours(new Date().getHours() + 2);

    return searchTrips(from!, to!, date);
  });

  return (
    <main class="container-small">
      <h1 class="center">Reise teilen</h1>
      <form class="card | flow">
        <div class="flow">
          <LocationSearch label="Von" location={from()} onChange={setFrom} name="from" />
          <LocationSearch label="Nach" location={to()} onChange={setTo} name="to" />
        </div>
        <div>
          <Switch>
            <Match when={trips.state === "errored"}>
              Ein Fehler ist aufgetreten
            </Match>
            <Match when={trips.state === "refreshing"}>
              <div class="flex">
                <Spinner />
              </div>
            </Match>
            <Match when={trips.state === "ready"}>
              <For each={trips()}>
                {(item) => <TripRow trip={item} />}
              </For>
            </Match>
          </Switch>
        </div>
      </form>
    </main>
  )
}

export default App
