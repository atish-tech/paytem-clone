import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = ({ users , setSearch , searchValue }) => {
  return (
    <>
      <div className="font-bold mt-6 text-lg ">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded text-black border-slate-200"
          onChange={e => setSearch(e.target.value)}
          value={searchValue}
        ></input>
      </div>
      <div className="user-scrollbar max-h-[65vh]  overflow-auto sm:p-5">
        {users != null &&
          users.map((data) => {
            return (
              <div key={data._id}>
                <User uniqueId={data._id} userName={data.userName} />
              </div>
            );
          })}
      </div>
    </>
  );
};

function User({ userName, uniqueId }) {
  const navigateTo = useNavigate();

  return (
    <div key={uniqueId} className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-black">
            {userName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>{userName}</div>
        </div>
      </div>

      <div
        onClick={() => {
          navigateTo(`/send/?key=${uniqueId}&userName=${userName}`);
        }}
        className="flex flex-col justify-center h-ful"
      >
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
