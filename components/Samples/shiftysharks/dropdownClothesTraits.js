import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BeakerIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { sharkStorageAddress } from "../../../config";
import Storage from "../../../abis/sharkStorage.json";
import { colorRarity, colorNames, colorSVGCodes } from "./traits";
import { clothesParts } from "./traits";

const people = [
  {
    name: clothesParts[0].name,
    svgcode: clothesParts[0].svgcode,
    rarity: clothesParts[0].rarity,
    traitset: clothesParts[0].traitset
  },
  {
    name: clothesParts[1].name,
    svgcode: clothesParts[1].svgcode,
    rarity: clothesParts[1].rarity,
    traitset: clothesParts[1].traitset
  },
  {
    name: clothesParts[2].name,
    svgcode: clothesParts[2].svgcode,
    rarity: clothesParts[2].rarity,
    traitset: clothesParts[2].traitset
  },
  {
    name: clothesParts[3].name,
    svgcode: clothesParts[3].svgcode,
    rarity: clothesParts[3].rarity,
    traitset: clothesParts[3].traitset
  },
  {
    name: clothesParts[4].name,
    svgcode: clothesParts[4].svgcode,
    rarity: clothesParts[4].rarity,
    traitset: clothesParts[4].traitset
  },
  {
    name: clothesParts[5].name,
    svgcode: clothesParts[5].svgcode,
    rarity: clothesParts[5].rarity,
    traitset: clothesParts[5].traitset
  },
  {
    name: clothesParts[6].name,
    svgcode: clothesParts[6].svgcode,
    rarity: clothesParts[6].rarity,
    traitset: clothesParts[6].traitset
  },
  {
    name: clothesParts[7].name,
    svgcode: clothesParts[7].svgcode,
    rarity: clothesParts[7].rarity,
    traitset: clothesParts[7].traitset
  },
  {
    name: clothesParts[8].name,
    svgcode: clothesParts[8].svgcode,
    rarity: clothesParts[8].rarity,
    traitset: clothesParts[8].traitset
  },
  {
    name: clothesParts[9].name,
    svgcode: clothesParts[9].svgcode,
    rarity: clothesParts[9].rarity,
    traitset: clothesParts[9].traitset
  },
  {
    name: clothesParts[10].name,
    svgcode: clothesParts[10].svgcode,
    rarity: clothesParts[10].rarity,
    traitset: clothesParts[10].traitset
  },
  {
    name: clothesParts[11].name,
    svgcode: clothesParts[11].svgcode,
    rarity: clothesParts[11].rarity,
    traitset: clothesParts[11].traitset
  },
  {
    name: clothesParts[12].name,
    svgcode: clothesParts[12].svgcode,
    rarity: clothesParts[12].rarity,
    traitset: clothesParts[12].traitset
  },
  {
    name: clothesParts[13].name,
    svgcode: clothesParts[13].svgcode,
    rarity: clothesParts[13].rarity,
    traitset: clothesParts[13].traitset
  },
  {
    name: clothesParts[14].name,
    svgcode: clothesParts[14].svgcode,
    rarity: clothesParts[14].rarity,
    traitset: clothesParts[14].traitset
  },
  {
    name: clothesParts[15].name,
    svgcode: clothesParts[15].svgcode,
    rarity: clothesParts[15].rarity,
    traitset: clothesParts[15].traitset
  },
  {
    name: clothesParts[16].name,
    svgcode: clothesParts[16].svgcode,
    rarity: clothesParts[16].rarity,
    traitset: clothesParts[16].traitset
  },
  {
    name: clothesParts[17].name,
    svgcode: clothesParts[17].svgcode,
    rarity: clothesParts[17].rarity,
    traitset: clothesParts[17].traitset
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

    StorageContract.setClothingTrait(
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
        <p className=" mr-4">Clothes Traits: {clothesParts.length}</p>
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
