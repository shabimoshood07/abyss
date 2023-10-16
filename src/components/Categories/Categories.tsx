import { useState } from "react";

interface Data {
  id: number;
  text: string;
  subCat: Data[];
}

const Categories = ({
  category,
  data,
  setData,
}: {
  category: Data;
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
}) => {
  const [prompt, setPrompt] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [addingState, setAddingState] = useState<boolean>(false);

  //   generate unique IDs
  const generateId = (): number => {
    var minm = 10000000;
    var maxm = 999999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  };

  //   Get target category when adding a new category
  const targetCategory = (data: Data[], id: number): Data | null => {
    for (const dat of data) {
      if (dat.id === id) return dat;
      const subData = targetCategory(dat.subCat, id);
      if (subData) return subData;
    }
    return null;
  };

  const deleteCategory = (id: number) => {
    const updatedNodes = [...data];
    if (id === 1) return;
    removeCategory(updatedNodes, id);
    setData(updatedNodes);
  };

  const removeCategory = (data: Data[], id: number): boolean => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data.splice(i, 1);
        return true;
      } else if (removeCategory(data[i].subCat, id)) {
        return true;
      }
    }
    return false;
  };

  //   function to remove an added category with empty text, used to append the add form to a category
  const removeEmptyNode = (data: Data[]) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].text === "") {
        data.splice(i, 1);
        return true;
      } else if (removeEmptyNode(data[i].subCat)) {
        return true;
      }
    }
    return false;
  };

  //   get the parent used to target a particular sub categoryF
  const getParentId = (childId: number, data: Data[]): number | null => {
    for (const parent of data) {
      if (parent.subCat.some((child) => child.id === childId)) {
        return parent.id;
      }
      const sub = getParentId(childId, parent.subCat);
      if (sub) return sub;
    }
    return null;
  };

  //   Add new category
  const addNew = () => {
    let newSubCat: Data;
    newSubCat = {
      id: generateId(),
      text,
      subCat: [],
    };
    //if text is empty, append the form to add a new category to the target category
    if (text !== "") {
      const categories = [...data];
      const parentId = getParentId(category.id, categories);
      const target = targetCategory(categories, parentId!);
      if (target) target.subCat.push(newSubCat);
      removeEmptyNode(categories);
      setData(categories);
      setAddingState(false);
      setText("");
      return;
    }

    const categories = [...data];
    const target = targetCategory(categories, category.id);
    if (target) target.subCat.push(newSubCat);
    setData(categories);
    setAddingState(false);
    setText("");
    return;
  };
  const dataId = getParentId(category.id, data);

  return (
    <li className="list">
      {category.id !== 1 && category.text !== "" && (
        <p className="category-text" data-category-id={dataId}>
          {category.text}
        </p>
      )}
      {category.id == 1 && category.text !== "" && (
        <p className="main">{category.text}</p>
      )}
      {category.id == 1 && category.text !== "" && (
        <button
          className="add-cat-btn tree button add"
          onClick={() => {
            setAddingState(!addingState);
            addNew();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="add-cat-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      )}
      {category.id !== 1 && category.text !== "" && (
        <>
          <button
            className="add-cat-btn add"
            onClick={() => setPrompt(!prompt)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="add-cat-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <button className="add-cat-btn edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="add-cat-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            className="add-cat-btn delete"
            onClick={() => deleteCategory(category.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="add-cat-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}

      {/* Form to add new category */}
      {category.text === "" && (
        <form className="add-form">
          <input type="text" onChange={(e) => setText(e.target.value)} />
          <button
            className="add-cat-btn delete"
            onClick={() => {
              setAddingState(!addingState);
              deleteCategory(category.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="add-cat-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {text !== "" && (
            <button onClick={addNew} className="add-cat-btn check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="add-cat-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          )}
        </form>
      )}

      {/* Prompt */}
      {prompt && (
        <div className="prompt-con">
          <p>What do you want to add</p>
          <div>
            <button
              onClick={() => {
                setAddingState(!addingState);
                setPrompt(!prompt);
                addNew();
              }}
            >
              Category
            </button>
            <button>Service</button>
          </div>
        </div>
      )}

      {category.subCat.length > 0 && (
        <ul className="">
          {category.subCat.map((sub) => (
            <Categories
              category={sub}
              data={data}
              setData={setData}
              key={sub.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
export default Categories;
