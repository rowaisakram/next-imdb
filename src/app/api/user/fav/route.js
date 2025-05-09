import User from "@/lib/models/user.model";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { connect } from "mongoose";

export const PUT = async (req) => {
  const user = await currentUser();
  const client = await clerkClient();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return { status: 401, body: "Unauthorized" };
    }
    const existingUser = await User.findById(user.publicMetadata.userMongoId);
    if (existingUser.favs.some((fav) => fav.movieId == data.movieId)) {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
          $pull: { favs: { movieId: data.movieId } },
        },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav) => fav.movieId);
      console.log("updatefac");
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
          $addToSet: {
            fav: {
              movieId: data.movieId,
              title: data.title,
              description: data.overview,
              dateRelased: data.realseDate,
              rating: data.voteCount,
              image: data.image,
            },
          },
        },
        { new: true }
      );
      const updatedFavs = updatedUser.favs.map((fav) => fav.movieId);
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          favs: updatedFavs,
        },
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
