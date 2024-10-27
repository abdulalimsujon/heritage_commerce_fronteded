import ManageQuantity from "../../singleProduct/Manage.quantity";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <ManageQuantity id={id} />
    </div>
  );
};

export default Page;
