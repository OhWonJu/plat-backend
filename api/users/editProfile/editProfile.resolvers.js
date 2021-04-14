import { createWriteStream } from "fs"; // nodejs 라이브러리 파일 pip관련
import bcrypt from "bcrypt";

import client from "../../../client";
import { portectedResolver } from "../users.utils";
import { deleteInS3, uploadToS3 } from "../../shared/shared.utils";

const resolver = async (
  _,
  {
    firstName,
    lastName,
    userName,
    email,
    //password: newPassword,
    bio,
    profilePhoto,
  },
  { loggedInUser }
) => {
  // local server에 저장..?
  // if (profilePhoto) {
  //   const { filename, createReadStream } = await profilePhoto;
  //   const newFileName = `${loggedInUser.id}_${Date.now()}_${filename}`;
  //   const readStream = createReadStream();
  //   const writeStream = createWriteStream(
  //     process.cwd() + "/uploads/" + newFileName
  //   );
  //   // stream 간의 pipe 연결
  //   // readStram에 writeStream을 연결
  //   // read한 file을 write
  //   // 실무 형식에서는 aws를 사용할 예정
  //   readStream.pipe(writeStream);
  //   // server가 아직은 localhost.
  //   profilePhotoUrl = `http://localhost:4000/uploads/${newFileName}`;
  // }
  let profilePhotoUrl = null;
  // AWS에 저장
  if (profilePhoto) {
    const user = await client.user.findUnique({
      where: {
        id: loggedInUser.id,
      },
      select: {
        profilePhoto: true,
      },
    });
    if (user.profilePhoto) {
      await deleteInS3(user.profilePhoto);
    }
    profilePhotoUrl = await uploadToS3(
      profilePhoto,
      loggedInUser.id,
      `${loggedInUser.id}/profile`
    );
  }
  // let uglyPassword = null;
  // if (newPassword) {
  //   uglyPassword = await bcrypt.hash(newPassword, 10);
  // }
  if (userName) {
    const existingUserName = await client.user.findFirst({
      where: {
        userName,
      },
      select: {
        userName: true,
      },
    });
    if (existingUserName) {
      return {
        ok: false,
        error: "This userName is already taken.",
      };
    }
  }

  if (email) {
    const existingEmail = await client.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
    if (existingEmail) {
      return {
        ok: false,
        error: "this email is already taken.",
      };
    }
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      ...(userName && { userName: userName.toLowerCase() }),
      email,
      bio,
      //...(uglyPassword && { password: uglyPassword }), // ES6 문법.  ...(조건 && return Obj)
      ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: portectedResolver(resolver),
  },
};
