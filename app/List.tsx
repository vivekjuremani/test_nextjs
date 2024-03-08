


import { getGuestbookEntries } from "./lib/Handler"

export const dynamic = 'force-dynamic'
type list={ name :string , _id : string};
async function  fetching()
{
  return await getGuestbookEntries();
  
}
function iserror(arr : {entries: list[];
  error?: undefined; } | { error: string;
  entries?: undefined;}): arr is {entries: list[];
      error?: undefined; }{
  return arr.error === undefined;
}
const List = async() => {
let arr= await fetching();
if(!iserror(arr))
   return<></>;

  return (
    <div>
      <ul>
        {
     arr.entries.map((item,_)=><li key={_}>{item.name}</li> )
        }
      </ul>
    </div>
  )
}

export default List
