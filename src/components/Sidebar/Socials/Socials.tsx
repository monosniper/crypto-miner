import { SocialsLink } from "./SocialsLink/SocialsLink";

export const Socials = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <SocialsLink
        href={import.meta.env.VITE_FACEBOOK || "#"}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_410_21204)">
              <path
                d="M16 8.16699C16 3.74875 12.4182 0.166992 8 0.166992C3.58176 0.166992 0 3.74875 0 8.16699C0 11.9187 2.58304 15.0668 6.06752 15.9315V10.6118H4.41792V8.16699H6.06752V7.11355C6.06752 4.39067 7.29984 3.12859 9.97312 3.12859C10.48 3.12859 11.3546 3.22811 11.7123 3.32731V5.54331C11.5235 5.52347 11.1955 5.51355 10.7882 5.51355C9.47648 5.51355 8.9696 6.01051 8.9696 7.30235V8.16699H11.5827L11.1338 10.6118H8.9696V16.1084C12.9302 15.63 16 12.2572 16 8.16699Z"
                fill="#58667E"
              />
            </g>
            <defs>
              <clipPath id="clip0_410_21204">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
      />

      <SocialsLink
        href={import.meta.env.VITE_TELEGRAM || "#"}
        icon={
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M8.09766 0.166992C12.4848 0.166992 16.0977 3.7799 16.0977 8.16699C16.0977 12.5863 12.4848 16.167 8.09766 16.167C3.6783 16.167 0.0976562 12.5863 0.0976562 8.16699C0.0976562 3.7799 3.6783 0.166992 8.09766 0.166992ZM11.7751 5.61861C11.8073 5.52183 11.8073 5.42506 11.7751 5.29602C11.7751 5.23151 11.7106 5.13473 11.6783 5.10248C11.5815 5.0057 11.4202 5.0057 11.3557 5.0057C11.0654 5.0057 10.5815 5.16699 8.35572 6.10248C7.58153 6.42506 6.03314 7.07022 3.71056 8.10248C3.32346 8.26377 3.12991 8.3928 3.09766 8.55409C3.0654 8.81215 3.48475 8.90893 3.96862 9.07022C4.38798 9.19925 4.93637 9.36054 5.22669 9.36054C5.48475 9.36054 5.77508 9.26377 6.09766 9.03796C8.25895 7.55409 9.38798 6.81215 9.45249 6.81215C9.51701 6.81215 9.58153 6.7799 9.61378 6.81215C9.6783 6.87667 9.6783 6.94119 9.64604 6.97344C9.61378 7.13473 7.58153 9.0057 7.45249 9.13473C7.00088 9.58635 6.48475 9.87667 7.2912 10.3928C7.96862 10.8444 8.35572 11.1347 9.0654 11.5863C9.51701 11.8767 9.87185 12.2315 10.3235 12.1993C10.5493 12.167 10.7751 11.9734 10.8719 11.3605C11.1622 9.97344 11.6783 6.87667 11.7751 5.61861Z"
              fill="#8590A3"
            />
          </svg>
        }
      />

      <SocialsLink
        href={import.meta.env.VITE_INSTAGRAM || "#"}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_410_14578)">
              <path
                d="M8.00051 -0.000244141C5.82782 -0.000244141 5.55515 0.00925612 4.70181 0.0480899C3.85013 0.0870903 3.26879 0.221925 2.76012 0.41976C2.23395 0.624096 1.78761 0.897432 1.34294 1.34227C0.897932 1.78694 0.624596 2.23328 0.419593 2.75929C0.221258 3.26812 0.0862567 3.84963 0.047923 4.70097C0.00975589 5.55432 -0.000244141 5.82715 -0.000244141 7.99984C-0.000244141 10.1725 0.00942278 10.4444 0.0480898 11.2977C0.0872569 12.1494 0.222092 12.7307 0.41976 13.2394C0.624262 13.7656 0.897599 14.2119 1.34244 14.6566C1.78694 15.1016 2.23328 15.3756 2.75912 15.5799C3.26812 15.7778 3.84963 15.9126 4.70114 15.9516C5.55448 15.9904 5.82698 15.9999 7.99951 15.9999C10.1724 15.9999 10.4442 15.9904 11.2975 15.9516C12.1492 15.9126 12.7312 15.7778 13.2402 15.5799C13.7662 15.3756 14.2119 15.1016 14.6564 14.6566C15.1014 14.2119 15.3747 13.7656 15.5798 13.2396C15.7764 12.7307 15.9114 12.1492 15.9514 11.2979C15.9898 10.4445 15.9998 10.1725 15.9998 7.99984C15.9998 5.82715 15.9898 5.55448 15.9514 4.70114C15.9114 3.84946 15.7764 3.26812 15.5798 2.75945C15.3747 2.23328 15.1014 1.78694 14.6564 1.34227C14.2114 0.897266 13.7664 0.623929 13.2397 0.41976C12.7297 0.221925 12.148 0.0870903 11.2964 0.0480899C10.443 0.00925612 10.1714 -0.000244141 7.99801 -0.000244141H8.00051ZM7.28283 1.44144C7.49583 1.4411 7.7335 1.44144 8.00051 1.44144C10.1365 1.44144 10.3897 1.44911 11.2332 1.48744C12.0132 1.52311 12.4366 1.65344 12.7186 1.76294C13.0919 1.90794 13.3581 2.08128 13.6379 2.36128C13.9179 2.64128 14.0912 2.90795 14.2366 3.28129C14.3461 3.56296 14.4766 3.9863 14.5121 4.76631C14.5504 5.60965 14.5587 5.86299 14.5587 7.99801C14.5587 10.133 14.5504 10.3864 14.5121 11.2297C14.4764 12.0097 14.3461 12.4331 14.2366 12.7147C14.0916 13.0881 13.9179 13.3539 13.6379 13.6337C13.3579 13.9137 13.0921 14.0871 12.7186 14.2321C12.4369 14.3421 12.0132 14.4721 11.2332 14.5077C10.3899 14.5461 10.1365 14.5544 8.00051 14.5544C5.86432 14.5544 5.61115 14.5461 4.76781 14.5077C3.9878 14.4717 3.56446 14.3414 3.28229 14.2319C2.90895 14.0869 2.64228 13.9136 2.36228 13.6336C2.08228 13.3536 1.90894 13.0876 1.76361 12.7141C1.65411 12.4324 1.52361 12.0091 1.4881 11.229C1.44977 10.3857 1.4421 10.1324 1.4421 7.99601C1.4421 5.85965 1.44977 5.60765 1.4881 4.76431C1.52377 3.9843 1.65411 3.56096 1.76361 3.27896C1.90861 2.90562 2.08228 2.63895 2.36228 2.35895C2.64228 2.07894 2.90895 1.90561 3.28229 1.76027C3.56429 1.65027 3.9878 1.52027 4.76781 1.48444C5.50581 1.45111 5.79182 1.4411 7.28283 1.43944V1.44144ZM12.2709 2.76979C11.7409 2.76979 11.3109 3.19929 11.3109 3.72946C11.3109 4.25947 11.7409 4.68947 12.2709 4.68947C12.8009 4.68947 13.2309 4.25947 13.2309 3.72946C13.2309 3.19946 12.8009 2.76945 12.2709 2.76945V2.76979ZM8.00051 3.89146C5.73165 3.89146 3.89213 5.73098 3.89213 7.99984C3.89213 10.2687 5.73165 12.1074 8.00051 12.1074C10.2694 12.1074 12.1082 10.2687 12.1082 7.99984C12.1082 5.73098 10.2694 3.89146 8.00051 3.89146ZM8.00051 5.33315C9.47319 5.33315 10.6672 6.52699 10.6672 7.99984C10.6672 9.47253 9.47319 10.6665 8.00051 10.6665C6.52766 10.6665 5.33381 9.47253 5.33381 7.99984C5.33381 6.52699 6.52766 5.33315 8.00051 5.33315Z"
                fill="#8590A3"
              />
            </g>
            <defs>
              <clipPath id="clip0_410_14578">
                <rect width="16.0005" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        }
      />

      <SocialsLink
        href={import.meta.env.VITE_H || "#"}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12.6009 0.666992H15.0544L9.69434 6.79317L16 15.1295H11.0627L7.19566 10.0736L2.77087 15.1295H0.31595L6.04904 8.57688L0 0.666992H5.06262L8.55811 5.28832L12.6009 0.666992ZM11.7399 13.661H13.0993L4.32392 2.05836H2.86506L11.7399 13.661Z"
              fill="#8590A3"
            />
          </svg>
        }
      />

      <SocialsLink
        href={import.meta.env.VITE_TIK_TOK || "#"}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_410_14582)">
              <path
                d="M14.8482 6.72301C13.4433 6.75423 12.1321 6.31717 11.0082 5.50547V11.0937C11.0082 13.2166 9.69701 15.0897 7.69898 15.839C5.73217 16.5883 3.4844 16.0263 2.11075 14.4341C0.705891 12.8107 0.456137 10.5318 1.45515 8.6586C2.45416 6.81667 4.51463 5.78644 6.63753 6.06741V8.87714C5.66974 8.56494 4.60828 8.90835 4.01512 9.72005C3.45318 10.563 3.45318 11.6556 4.04634 12.4673C4.6395 13.279 5.70095 13.6224 6.63753 13.3103C7.60532 12.9981 8.26093 12.0927 8.26093 11.0937V0.166992H11.0082C11.0082 0.416745 11.0082 0.635279 11.0706 0.885033C11.258 1.91526 11.8511 2.82062 12.7565 3.38257C13.3496 3.78841 14.0989 4.00695 14.8482 4.00695V6.72301Z"
                fill="#8590A3"
              />
            </g>
            <defs>
              <clipPath id="clip0_410_14582">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.000488281)"
                />
              </clipPath>
            </defs>
          </svg>
        }
      />

      <SocialsLink
        href={import.meta.env.VITE_YOUTUBE || "#"}
        icon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M15.649 3.95127C16 5.17979 16 7.81233 16 7.81233C16 7.81233 16 10.4156 15.649 11.6734C15.4735 12.3754 14.9177 12.9019 14.245 13.0774C12.9872 13.3992 8.01463 13.3992 8.01463 13.3992C8.01463 13.3992 3.0128 13.3992 1.75503 13.0774C1.08227 12.9019 0.526508 12.3754 0.351005 11.6734C0 10.4156 0 7.81233 0 7.81233C0 7.81233 0 5.17979 0.351005 3.95127C0.526508 3.24926 1.08227 2.6935 1.75503 2.518C3.0128 2.16699 8.01463 2.16699 8.01463 2.16699C8.01463 2.16699 12.9872 2.16699 14.245 2.518C14.9177 2.6935 15.4735 3.24926 15.649 3.95127ZM6.3766 10.1816L10.5302 7.81233L6.3766 5.44304V10.1816Z"
              fill="#8590A3"
            />
          </svg>
        }
      />
    </div>
  );
};