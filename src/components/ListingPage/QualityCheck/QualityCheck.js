import { useHistory } from "react-router-dom";
import Stars from "../Stars";

export default function QualityCheck({ name, auth0Id, comment, rating }) {
    const history = useHistory();
    function redirectToHaulPage() {
        history.push(`/${auth0Id}/dashboard`);
    }
    return (
        <div class="flex items-start my-4 ">
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
        </div>
    );
}
