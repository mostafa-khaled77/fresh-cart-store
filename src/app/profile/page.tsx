import { getUserOrders } from "../_actions/orders.actions";
import { getLoggedUserWishlist } from "../_actions/wishlist.actions";
import OrdersContent from "../_components/OrdersContent/OrdersContent";
import PersonalInfoFormInProfile from "../_components/ProfileComponents/PersonalInfoFormInProfile";
import ProfileSideBar from "../_components/ProfileComponents/ProfileSideBar";
import SecurityForm from "../_components/ProfileComponents/SecurityForm";
import UserProfileCard from "../_components/ProfileComponents/UserProfileCard";
import WishlistContent from "../_components/WishlistContent/WishlistContent";

type tSearchParams = Promise<{ tab?: string }>;
export const dynamic = 'force-dynamic';

export default async function ProfilePage({ searchParams }: { searchParams: tSearchParams }) {
  const { tab } = await searchParams;
  const activeTab = tab || "profile";
  
  const [wishListData, ordersData] = await Promise.all([
    getLoggedUserWishlist(),
    getUserOrders()
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-6 md:py-20" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        
        <aside className="lg:col-span-3 flex flex-col gap-4 h-fit lg:sticky lg:top-24">
          <UserProfileCard />
          <ProfileSideBar activeTab={activeTab} />
        </aside>

        <main className="lg:col-span-9 bg-white p-6 md:p-16 rounded-[2rem] border border-slate-50 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-slate-100 rounded-full -ml-40 -mt-40 blur-[100px] opacity-60" />
          
          <div className="relative z-10">
            {activeTab === "profile" && <PersonalInfoFormInProfile />}
            {activeTab === "security" && <SecurityForm />}
            {activeTab === "wishlist" && <WishlistContent wishListData={wishListData} />}
            {activeTab === "orders" && <OrdersContent ordersData={ordersData} />}
          </div>
        </main>

      </div>
    </div>
  );
}