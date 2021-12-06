import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BeakerIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { sharkStorageAddress } from "../../../config";
import Storage from "../../../abis/sharkStorage.json";
import { colorRarity, colorNames, colorSVGCodes } from "./traits";
import { headParts } from "./traits";

const people = [
  {
    name: headParts[0].name,
    svgcode: headParts[0].svgcode,
    rarity: headParts[0].rarity,
    traitset: headParts[0].traitset
  },
  {
    name: headParts[1].name,
    svgcode: headParts[1].svgcode,
    rarity: headParts[1].rarity,
    traitset: headParts[1].traitset
  },
  {
    name: headParts[2].name,
    svgcode: headParts[2].svgcode,
    rarity: headParts[2].rarity,
    traitset: headParts[2].traitset
  },
  {
    name: headParts[3].name,
    svgcode: headParts[3].svgcode,
    rarity: headParts[3].rarity,
    traitset: headParts[3].traitset
  },
  {
    name: headParts[4].name,
    svgcode: headParts[4].svgcode,
    rarity: headParts[4].rarity,
    traitset: headParts[4].traitset
  },
  {
    name: headParts[5].name,
    svgcode: headParts[5].svgcode,
    rarity: headParts[5].rarity,
    traitset: headParts[5].traitset
  },
  {
    name: headParts[6].name,
    svgcode: headParts[6].svgcode,
    rarity: headParts[6].rarity,
    traitset: headParts[6].traitset
  },
  {
    name: headParts[7].name,
    svgcode: headParts[7].svgcode,
    rarity: headParts[7].rarity,
    traitset: headParts[7].traitset
  },
  {
    name: headParts[8].name,
    svgcode: headParts[8].svgcode,
    rarity: headParts[8].rarity,
    traitset: headParts[8].traitset
  },
  {
    name: headParts[9].name,
    svgcode: headParts[9].svgcode,
    rarity: headParts[9].rarity,
    traitset: headParts[9].traitset
  },
  {
    name: headParts[10].name,
    svgcode: headParts[10].svgcode,
    rarity: headParts[10].rarity,
    traitset: headParts[10].traitset
  },
  {
    name: headParts[11].name,
    svgcode: headParts[11].svgcode,
    rarity: headParts[11].rarity,
    traitset: headParts[11].traitset
  },
  {
    name: headParts[12].name,
    svgcode: headParts[12].svgcode,
    rarity: headParts[12].rarity,
    traitset: headParts[12].traitset
  },
  {
    name: headParts[13].name,
    svgcode: headParts[13].svgcode,
    rarity: headParts[13].rarity,
    traitset: headParts[13].traitset
  },
  {
    name: headParts[14].name,
    svgcode: headParts[14].svgcode,
    rarity: headParts[14].rarity,
    traitset: headParts[14].traitset
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

    StorageContract.setHeadTrait(
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
        <p className=" mr-4">Head Traits: {headParts.length}</p>
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
