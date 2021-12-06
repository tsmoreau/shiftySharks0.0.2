import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { sharkStorageAddress } from "../../../config";
import Storage from "../../../abis/sharkStorage.json";
import { eyeParts } from "./traits";

const people = [
  {
    name: eyeParts[0].name,
    svgcode: eyeParts[0].svgcode,
    rarity: eyeParts[0].rarity,
    traitset: eyeParts[0].traitset
  },
  {
    name: eyeParts[1].name,
    svgcode: eyeParts[1].svgcode,
    rarity: eyeParts[1].rarity,
    traitset: eyeParts[1].traitset
  },
  {
    name: eyeParts[2].name,
    svgcode: eyeParts[2].svgcode,
    rarity: eyeParts[2].rarity,
    traitset: eyeParts[2].traitset
  },
  {
    name: eyeParts[3].name,
    svgcode: eyeParts[3].svgcode,
    rarity: eyeParts[3].rarity,
    traitset: eyeParts[3].traitset
  },
  {
    name: eyeParts[4].name,
    svgcode: eyeParts[4].svgcode,
    rarity: eyeParts[4].rarity,
    traitset: eyeParts[4].traitset
  },
  {
    name: eyeParts[5].name,
    svgcode: eyeParts[5].svgcode,
    rarity: eyeParts[5].rarity,
    traitset: eyeParts[5].traitset
  },
  {
    name: eyeParts[6].name,
    svgcode: eyeParts[6].svgcode,
    rarity: eyeParts[6].rarity,
    traitset: eyeParts[6].traitset
  },
  {
    name: eyeParts[7].name,
    svgcode: eyeParts[7].svgcode,
    rarity: eyeParts[7].rarity,
    traitset: eyeParts[7].traitset
  },
  {
    name: eyeParts[8].name,
    svgcode: eyeParts[8].svgcode,
    rarity: eyeParts[8].rarity,
    traitset: eyeParts[8].traitset
  },
  {
    name: eyeParts[9].name,
    svgcode: eyeParts[9].svgcode,
    rarity: eyeParts[9].rarity,
    traitset: eyeParts[9].traitset
  },
  {
    name: eyeParts[10].name,
    svgcode: eyeParts[10].svgcode,
    rarity: eyeParts[10].rarity,
    traitset: eyeParts[10].traitset
  },
  {
    name: eyeParts[11].name,
    svgcode: eyeParts[11].svgcode,
    rarity: eyeParts[11].rarity,
    traitset: eyeParts[11].traitset
  }
];

export default function Example() {
  const [selected, setSelected] = useState(people[0]);
  const [uploaded, setUploaded] = useState("Uploaded:");

  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError
  } = useWeb3React();

  function uploadTrait() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const StorageContract = new ethers.Contract(
      sharkStorageAddress,
      Storage.abi,
      signer
    );

    StorageContract.setEyeTrait(
      selected.rarity,
      selected.traitset,
      selected.name,
      selected.svgcode
    );

    setUploaded(uploaded + selected.name);
  }

  return (
    <div className=" flex flex-col border w-full rounded-xl py-6 px-6">
      <div className="w-full items-center  flex justify-between">
        <p className=" mr-4">Eye Traits: {eyeParts.length}</p>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mr-2">
            <Listbox.Button className="px-2 text-sm font-mono relative w-48 text-left bg-white rounded-lg border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
              <span className="w-full block truncate text-sm py-1 pl-2.5">
                {selected.name}
              </span>
              <span className="absolute inset-y-0 right-0 pr-1 flex items-center pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
                          cursor-default text-sm font-mono select-none relative py-2 pl-3 pr-4`
                    }
                    value={person}
                    disabled={person.unavailable}
                  >
                    {({ selected, active }) => <>{person.name}</>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <button
          onClick={uploadTrait}
          className="rounded border bg-gray-50 text-gray-800 px-4 py-0.5"
        >
          UPLOAD
        </button>
      </div>
      <div className="mt-1 text-sm">{uploaded}</div>
      <div className="py-2 text-sm  break-words">
        {selected.name}, {selected.rarity}, {selected.traitset}
      </div>
      <div className="break-all flex text-xs overflow-hidden text-justify w-full flex-wrap">
        {selected.svgcode}
      </div>
    </div>
  );
}
