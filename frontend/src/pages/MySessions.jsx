import React, {useContext} from 'react'
import { AppContext } from '../context/AppContext'

const MySessions = () => {

  const { mentors } = useContext(AppContext);
  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My sessions
      </p>
      <div>
        {mentors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.image} alt="" />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p className="text-xs">
                {item.degree} -{item.branch}
              </p>
              <p className="text-xs">
                {new Date().getFullYear() - item.passingYear} Years Exp
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MySessions