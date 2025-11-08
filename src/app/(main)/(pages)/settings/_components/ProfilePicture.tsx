type Props = {};
export default function ProfilePicture({}: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex h-[30vh] flex-col items-center justify-center"></div>
    </div>
  );
}
