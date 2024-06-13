import { Input } from "@/components/UI";
import UserTable from "@/components/appComp/UserTable";
import { useAppStore } from "@/store";
import { debounce, searchFilter } from "@/utils/util";
import React, { useRef } from "react";

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const axiosFetchAbortController = useRef<AbortController>(null!);

  const {
    allUsers,
    getAllUsers,
    totalUserPages,
    filteredUsers,
    setFilteredUsers,
  } = useAppStore((state) => ({
    allUsers: state.allUsers,
    getAllUsers: state.getAllUsers,
    totalUserPages: state.totalUserPages,
    filteredUsers: state.filteredUsers,
    setFilteredUsers: state.setFilteredUsers,
  }));

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    // loadAllUsers(currentPage + 1);
    /**
     * Load next page of users
     * Better to pass the page number as an argument in api call
     * BUT for now, we can just increment the page number and slice the users from allUsers
     * and set it to filteredUsers
     */
    const start = currentPage * 10;
    const end = start + 10;

    if (search.length > 0) {
      const filtered = allUsers.filter((user) =>
        searchFilter(search, user.name.first, user.location.city, user.email)
      );
      setFilteredUsers(filtered.slice(start, end), filtered.length / 10);
      return;
    }

    setFilteredUsers(allUsers.slice(start, end), allUsers.length / 10);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    // loadAllUsers(currentPage - 1);
    /**
     * Load previous page of users
     * Better to pass the page number as an argument in api call
     * BUT for now, we can just decrement the page number and slice the users from allUsers
     * and set it to filteredUsers
     */
    const start = (currentPage - 2) * 10;
    const end = start + 10;

    if (search.length > 0) {
      const filtered = allUsers.filter((user) =>
        searchFilter(search, user.name.first, user.location.city, user.email)
      );
      setFilteredUsers(filtered.slice(start, end), filtered.length / 10);
      return;
    }

    setFilteredUsers(allUsers.slice(start, end), allUsers.length / 10);
  };

  const loadAllUsers = async (page: number) => {
    setLoading(true);
    axiosFetchAbortController.current = new AbortController();
    await getAllUsers(page, axiosFetchAbortController.current.signal);
    setLoading(false);
  };

  React.useEffect(() => {
    loadAllUsers(currentPage);

    return () => {
      axiosFetchAbortController.current.abort();
    };
  }, []);

  const debouncedSearch = React.useCallback(
    debounce((searchValue: string) => {
      if (searchValue.length === 0) {
        setFilteredUsers(allUsers.slice(0, 10), allUsers.length / 10);
        if (currentPage !== 1) {
          setCurrentPage(1);
        }
        return;
      }

      const filtered = allUsers.filter((user) =>
        searchFilter(
          searchValue,
          user.name.first,
          user.location.city,
          user.email
        )
      );

      setFilteredUsers(filtered.slice(0, 10), filtered.length / 10);
    }, 500),
    [allUsers, setFilteredUsers]
  );

  return (
    <div className="mt-6 mb-10">
      <div className="flex items-center gap-4">
        <Input
          label="Search by name,email or city"
          placeholder="Search user..."
          inputClassName="text-sm"
          wrapperClassName="sm:w-1/2 w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      <UserTable
        users={filteredUsers}
        totalPage={totalUserPages}
        currentPage={currentPage}
        handleNext={handleNext}
        handlePrev={handlePrev}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
