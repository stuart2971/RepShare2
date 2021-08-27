import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Stars from "../Stars";
import { getAuth0Id } from "../../utils/GeneralUtils";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { deleteComment } from "../../utils/ListingUtils";
export default function QualityCheck({
    name,
    auth0Id,
    comment,
    rating,
    _id,
    listingId,
    updateListing,
}) {
    const { user } = useAuth0();
    const history = useHistory();
    function redirectToHaulPage() {
        history.push(`/${auth0Id}/dashboard`);
    }
    const threeDots = (
        <MenuButton>
            <div className=" w-10 h-10  p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6 bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </div>
        </MenuButton>
    );
    async function makeDeleteCommentRequest() {
        try {
            const status = await deleteComment(listingId, _id);
            if (status.deleted) updateListing();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div class="flex items-start my-4 justify-between">
            <div class="ml-6">
                <p class="flex items-baseline">
                    <span
                        onClick={redirectToHaulPage}
                        class="cursor-pointer text-gray-600 font-bold"
                    >
                        {name}
                    </span>
                </p>
                <Stars count={rating} size={4} />

                <div class="mt-3">
                    <p class="mt-1">{comment}</p>
                </div>
            </div>
            <div className="flex items-center h-14">
                {auth0Id === getAuth0Id(user) ? (
                    <Menu direction="bottom" menuButton={threeDots}>
                        <MenuItem onClick={makeDeleteCommentRequest}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="mr-2 w-4 h-4"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                            Delete Comment
                        </MenuItem>
                    </Menu>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
