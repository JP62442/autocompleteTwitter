import { useRef, useState } from "react";

import { getActiveToken } from "./utils/getActiveToken";

import { useSearchBox } from "react-instantsearch-hooks";
import { Autocomplete } from "./Autocomplete";

export function App() {
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const { refine } = useSearchBox();

  const inputRef = useRef();

  const handleInput = () => {
    const { value, selectionEnd = 0 } = inputRef.current;
    const { word } = getActiveToken(value, selectionEnd);
    const shouldOpenAutocomplete = /^@\w{1,15}$/.test(word);
    setShowAutocomplete(shouldOpenAutocomplete);
    shouldOpenAutocomplete && refine(word.slice(1));
  };

  const handleSelection = (userHandle) => {
    const { value, selectionEnd = 0 } = inputRef.current;
    const { word, range } = getActiveToken(value, selectionEnd);
    const [index] = range;

    const prefix = value.substring(0, index);
    const suffix = value.substring(index + word.length);

    const newText = prefix + `@${userHandle}` + suffix;

    inputRef.current.value = newText;
    inputRef.current.focus();

    setShowAutocomplete(false);
  };

  return (
    <main className="container">
      <section className="box">
        <div className="box-body">
          <aside className="box-avatar">
            <img src="https://unavatar.io/github/JP62442" alt="JuanFronDev" />
          </aside>

          <div className="box-compose">
            <form>
              <textarea
                placeholder="¿Qué está pasando?"
                className="box-textbox"
                onKeyUp={handleInput}
                onClick={() => {}}
                ref={inputRef}
              />
            </form>

            {showAutocomplete && (
              <Autocomplete handleSelection={handleSelection} />
            )}
          </div>
        </div>

        <footer className="box-footer">
          <button type="submit" className="tweet-button">
            Twittear
          </button>
        </footer>
      </section>
    </main>
  );
}
