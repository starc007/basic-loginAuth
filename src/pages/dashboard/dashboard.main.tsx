import { Input } from "@/components/UI";
import UserTable from "@/components/appComp/UserTable";
import { useAppStore } from "@/store";
import React, { useCallback, useRef } from "react";

const totalPage = 500; // 5000 / 10 = 500

const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const axiosFetchAbortController = useRef<AbortController>(null!);

  const { allUsers, getAllUsers } = useAppStore((state) => ({
    allUsers: state.allUsers,
    getAllUsers: state.getAllUsers,
  }));

  const handleNext = useCallback(() => {}, []);
  const handlePrev = useCallback(() => {}, []);

  const loadAllUsers = async () => {
    setLoading(true);
    axiosFetchAbortController.current = new AbortController();
    await getAllUsers(currentPage, axiosFetchAbortController.current.signal);
    setLoading(false);
  };

  React.useEffect(() => {
    loadAllUsers();

    return () => {
      axiosFetchAbortController.current.abort();
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4">
        <Input
          label="Search by name"
          placeholder="Search user..."
          inputClassName="text-sm"
          wrapperClassName="w-96"
        />
      </div>
      <UserTable
        users={allUsers}
        totalPage={totalPage}
        currentPage={currentPage}
        handleNext={handleNext}
        handlePrev={handlePrev}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
