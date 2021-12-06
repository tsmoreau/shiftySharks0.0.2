import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BeakerIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { sharkStorageAddress } from "../../../config";
import Storage from "../../../abis/sharkStorage.json";
import { colorRarity, colorNames, colorSVGCodes } from "./traits";
import { neckParts } from "./traits_backup";

const people = [
  {
    name: neckParts[0].name,
    svgcode: neckParts[0].svgcode,
    rarity: neckParts[0].rarity,
    traitset: neckParts[0].traitset
  },
  {
    name: neckParts[1].name,
    svgcode: neckParts[1].svgcode,
    rarity: neckParts[1].rarity,
    traitset: neckParts[1].traitset
  },
  {
    name: neckParts[2].name,
    svgcode: neckParts[2].svgcode,
    rarity: neckParts[2].rarity,
    traitset: neckParts[2].traitset
  },
  {
    name: neckParts[3].name,
    svgcode: neckParts[3].svgcode,
    rarity: neckParts[3].rarity,
    traitset: neckParts[3].traitset
  },
  {
    name: neckParts[4].name,
    svgcode: neckParts[4].svgcode,
    rarity: neckParts[4].rarity,
    traitset: neckParts[4].traitset
  },
  {
    name: neckParts[5].name,
    svgcode: neckParts[5].svgcode,
    rarity: neckParts[5].rarity,
    traitset: neckParts[5].traitset
  },
  {
    name: neckParts[6].name,
    svgcode: neckParts[6].svgcode,
    rarity: neckParts[6].rarity,
    traitset: neckParts[6].traitset
  }
];

export default function Example() {
  const [selected, setSelected] = useState(people[0]);
  const [uploaded, setUploaded] = useState("Uploaded");

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

    StorageContract.setNeckTrait(
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
        <p className=" mr-4">Neck Traits: {neckParts.length}</p>
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
