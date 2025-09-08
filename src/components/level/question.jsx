export default function Question({data}) {
   
    
  
  return (
    <h2 className="font-bold  text-lg text-center text-[#D9D9D9] px-8">
      {data?.questions?.[0]?.question}
    </h2>
  );
}
