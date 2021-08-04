export default function CreateListing() {
    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2
                    className="
          my-6
          text-2xl
          font-semibold
          text-gray-700
          dark:text-gray-200
        "
                >
                    Create a Listing
                </h2>
                {/* CTA */}
                <a
                    className="
          flex
          items-center
          justify-between
          p-4
          mb-8
          text-sm
          font-semibold
          text-purple-100
          bg-purple-600
          rounded-lg
          shadow-md
          focus:outline-none focus:shadow-outline-purple
        "
                >
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>Star this project on GitHub</span>
                    </div>
                    <span>View more →</span>
                </a>

                <div
                    className="
          px-4
          py-3
          mb-8
          bg-white
          rounded-lg
          shadow-md
          dark:bg-gray-800
        "
                >
                    <label className="block text-sm">
                        <span className=" text-gray-700 dark:text-gray-400">
                            Link
                        </span>
                        <input
                            autoFocus
                            className="
                                w-full p-2 text-base placeholder-gray-600 border focus:border-purple-700 rounded-md focus:shadow-outline focus:outline-none
                            "
                            placeholder="https://item.taobao.com/..."
                        />
                    </label>
                    <div className="mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Account Type
                        </span>
                        <div className="mt-2">
                            <label
                                className="
                inline-flex
                items-center
                text-gray-600
                dark:text-gray-400
              "
                            >
                                <input
                                    type="radio"
                                    className="
                  text-purple-600
                  form-radio
                  focus:border-purple-400
                  focus:outline-none
                  focus:shadow-outline-purple
                  dark:focus:shadow-outline-gray
                "
                                    name="accountType"
                                    defaultValue="personal"
                                />
                                <span className="ml-2">Personal</span>
                            </label>
                            <label
                                className="
                inline-flex
                items-center
                ml-6
                text-gray-600
                dark:text-gray-400
              "
                            >
                                <input
                                    type="radio"
                                    className="
                  text-purple-600
                  form-radio
                  focus:border-purple-400
                  focus:outline-none
                  focus:shadow-outline-purple
                  dark:focus:shadow-outline-gray
                "
                                    name="accountType"
                                    defaultValue="busines"
                                />
                                <span className="ml-2">Business</span>
                            </label>
                        </div>
                    </div>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Requested Limit
                        </span>
                        <select
                            className="
              block
              w-full
              mt-1
              text-sm
              dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
              form-select
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
            "
                        >
                            <option>$1,000</option>
                            <option>$5,000</option>
                            <option>$10,000</option>
                            <option>$25,000</option>
                        </select>
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Multiselect
                        </span>
                        <select
                            className="
              block
              w-full
              mt-1
              text-sm
              dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
              form-multiselect
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
            "
                            multiple
                        >
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                            <option>Option 4</option>
                            <option>Option 5</option>
                        </select>
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Message
                        </span>
                        <textarea
                            className="
              block
              w-full
              mt-1
              text-sm
              dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
              form-textarea
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
            "
                            rows={3}
                            placeholder="Enter some long form content."
                            defaultValue={""}
                        />
                    </label>
                    <div className="flex mt-6 text-sm">
                        <label className="flex items-center dark:text-gray-400">
                            <input
                                type="checkbox"
                                className="
                text-purple-600
                form-checkbox
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
              "
                            />
                            <span className="ml-2">
                                I agree to the
                                <span className="underline">
                                    privacy policy
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
                {/* Validation inputs */}
                <h4
                    className="
          mb-4
          text-lg
          font-semibold
          text-gray-600
          dark:text-gray-300
        "
                >
                    Validation
                </h4>
                <div
                    className="
          px-4
          py-3
          mb-8
          bg-white
          rounded-lg
          shadow-md
          dark:bg-gray-800
        "
                >
                    {/* Invalid input */}
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Invalid input
                        </span>
                        <input
                            className="
              block
              w-full
              mt-1
              text-sm
              border-red-600
              dark:text-gray-300 dark:bg-gray-700
              focus:border-red-400
              focus:outline-none
              focus:shadow-outline-red
              form-input
            "
                            placeholder="Jane Doe"
                        />
                        <span className="text-xs text-red-600 dark:text-red-400">
                            Your password is too short.
                        </span>
                    </label>
                    {/* Valid input */}
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Valid input
                        </span>
                        <input
                            className="
              block
              w-full
              mt-1
              text-sm
              border-green-600
              dark:text-gray-300 dark:bg-gray-700
              focus:border-green-400
              focus:outline-none
              focus:shadow-outline-green
              form-input
            "
                            placeholder="Jane Doe"
                        />
                        <span className="text-xs text-green-600 dark:text-green-400">
                            Your password is strong.
                        </span>
                    </label>
                    {/* Helper text */}
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Helper text
                        </span>
                        <input
                            className="
              block
              w-full
              mt-1
              text-sm
              dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
              focus:border-purple-400
              focus:outline-none
              focus:shadow-outline-purple
              dark:focus:shadow-outline-gray
              form-input
            "
                            placeholder="Jane Doe"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            Your password must be at least 6 characters long.
                        </span>
                    </label>
                </div>
                {/* Inputs with icons */}
                <h4
                    className="
          mb-4
          text-lg
          font-semibold
          text-gray-600
          dark:text-gray-300
        "
                >
                    Icons
                </h4>
                <div
                    className="
          px-4
          py-3
          mb-8
          bg-white
          rounded-lg
          shadow-md
          dark:bg-gray-800
        "
                >
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Icon left
                        </span>
                        {/* focus-within sets the color for the icon when input is focused */}
                        <div
                            className="
              relative
              text-gray-500
              focus-within:text-purple-600
              dark:focus-within:text-purple-400
            "
                        >
                            <input
                                className="
                block
                w-full
                pl-10
                mt-1
                text-sm text-black
                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
                form-input
              "
                                placeholder="Jane Doe"
                            />
                            <div
                                className="
                absolute
                inset-y-0
                flex
                items-center
                ml-3
                pointer-events-none
              "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Icon right
                        </span>
                        {/* focus-within sets the color for the icon when input is focused */}
                        <div
                            className="
              relative
              text-gray-500
              focus-within:text-purple-600
              dark:focus-within:text-purple-400
            "
                        >
                            <input
                                className="
                block
                w-full
                pr-10
                mt-1
                text-sm text-black
                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
                form-input
              "
                                placeholder="Jane Doe"
                            />
                            <div
                                className="
                absolute
                inset-y-0
                right-0
                flex
                items-center
                mr-3
                pointer-events-none
              "
                            >
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                {/* Inputs with buttons */}
                <h4
                    className="
          mb-4
          text-lg
          font-semibold
          text-gray-600
          dark:text-gray-300
        "
                >
                    Buttons
                </h4>
                <div
                    className="
          px-4
          py-3
          mb-8
          bg-white
          rounded-lg
          shadow-md
          dark:bg-gray-800
        "
                >
                    <label className="block text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Button left
                        </span>
                        <div className="relative">
                            <input
                                className="
                block
                w-full
                pl-20
                mt-1
                text-sm
                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
                form-input
              "
                                placeholder="Jane Doe"
                            />
                            <button
                                className="
                absolute
                inset-y-0
                px-4
                text-sm
                font-medium
                leading-5
                text-white
                transition-colors
                duration-150
                bg-purple-600
                border border-transparent
                rounded-l-md
                active:bg-purple-600
                hover:bg-purple-700
                focus:outline-none focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
              "
                            >
                                Click
                            </button>
                        </div>
                    </label>
                    <label className="block mt-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-400">
                            Button right
                        </span>
                        <div className="relative text-gray-500 focus-within:text-purple-600">
                            <input
                                className="
                block
                w-full
                pr-20
                mt-1
                text-sm text-black
                dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700
                focus:border-purple-400
                focus:outline-none
                focus:shadow-outline-purple
                dark:focus:shadow-outline-gray
                form-input
              "
                                placeholder="Jane Doe"
                            />
                            <button
                                className="
                absolute
                inset-y-0
                right-0
                px-4
                text-sm
                font-medium
                leading-5
                text-white
                transition-colors
                duration-150
                bg-purple-600
                border border-transparent
                rounded-r-md
                active:bg-purple-600
                hover:bg-purple-700
                focus:outline-none focus:shadow-outline-purple
              "
                            >
                                Click
                            </button>
                        </div>
                    </label>
                </div>
            </div>
        </main>
    );
}
