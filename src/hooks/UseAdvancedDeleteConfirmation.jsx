
import { toast } from "react-toastify";

const UseAdvancedDeleteConfirmation = (deleteAction, onSuccess, onError) => {
  const handleDeleteWithConfirmation = async (id, itemName = "item") => {
    toast(
      <div>
        <p className="font-semibold text-white">
          Confirm Delete?
        </p>
        <p className="text-white">
          Are you sure you want to delete this {itemName}? This action cannot be
          undone.
        </p>
        <hr />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-2 text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring focus-ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await deleteAction(id);
                toast.dismiss();
                toast.success(
                  onSuccess || `${itemName} deleted successfully!`,
                  {
                    className:
                      "bg-green-100 border-l-4 border-green-500 text-green-700",
                    bodyClassName: "py-2 px-3",
                    progressClassName: "bg-green-500",
                  }
                );
              } catch (error) {
                toast.error(onError || `Failed to delete ${itemName}.`, {
                  className:
                    "bg-red-100 border-l-4 border-red-500 text-red-700",
                  bodyClassName: "py-2 px-3",
                  progressClassName: "bg-red-500",
                });
                console.error(`Error deleting ${itemName}:`, error);
              }
            }}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus-ring-red-300"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center", 
        closeButton: false,
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        className:
          "bg-white dark:bg-gray-800 shadow-md rounded-md p-4", 
        bodyClassName: "p-0",
      }
    );
  };

  return handleDeleteWithConfirmation;
};

export default UseAdvancedDeleteConfirmation;
