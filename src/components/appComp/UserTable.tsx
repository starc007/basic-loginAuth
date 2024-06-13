import { FC } from "react";
import BarLoader from "./BarLoader";

interface IUserTable {
  users: IUser[];
  currentPage: number;
  totalPage: number;
  handlePrev: () => void;
  handleNext: () => void;
  loading?: boolean;
}

const UserTable: FC<IUserTable> = ({
  users,
  currentPage,
  totalPage,
  handleNext,
  handlePrev,
  loading,
}) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      gender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {/* If loading is true, show loading spinner */}
                  {loading && (
                    <tr>
                      <td colSpan={4}>
                        <BarLoader />
                      </td>
                    </tr>
                  )}

                  {/* If users is empty, show no data */}
                  {!loading && users.length === 0 && (
                    <tr>
                      <td colSpan={4}>
                        <div className="flex justify-center items-center p-4">
                          <p className="text-gray-500">No data found</p>
                        </div>
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    users.length > 0 &&
                    users.map((user, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.picture.medium}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {user.name.first} {user.name.last}
                              </div>
                              <div className="text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.location.city}, {user.location.country}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.gender}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm text-gray-700">
              Page {currentPage} of {totalPage}
            </p>
          </div>
          <div>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPage}
              className="ml-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
