import { PropsWithClassName, PropsWithSize } from "@/types";
import { FC } from "react";

export const ServersIcon: FC<PropsWithSize<PropsWithClassName>> = ({
  className,
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      className={className}
      fill="#000000"
      height={height}
      width={width}
      version="1.1"
      id="Capa_1"
      viewBox="0 0 367.463 367.463"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <path d="M256.77,158.803c0-6.385-4.264-15.318-24.575-21.622c-13.146-4.079-30.48-6.326-48.813-6.326 c-18.332,0-35.668,2.247-48.813,6.326c-20.312,6.304-24.575,15.237-24.575,21.622v106.898c0,6.385,4.264,15.319,24.575,21.623 c13.145,4.079,30.479,6.326,48.813,6.326s35.669-2.247,48.813-6.326c20.312-6.304,24.575-15.238,24.575-21.623v-31.309 c0.149-0.847,0.214-1.666,0.214-2.446h-0.214V158.803z M141.335,150.823c11.471-3.204,26.402-4.969,42.046-4.969 s30.576,1.765,42.047,4.969c11.364,3.175,15.451,6.673,16.252,7.979c-0.801,1.308-4.888,4.806-16.251,7.979 c-11.471,3.205-26.403,4.97-42.048,4.97c-15.644,0-30.576-1.765-42.047-4.97c-11.363-3.174-15.45-6.672-16.251-7.979 C125.884,157.496,129.971,153.998,141.335,150.823z M241.77,265.522c-0.495,1.128-4.388,4.82-16.341,8.158 c-11.471,3.205-26.403,4.97-42.048,4.97c-15.644,0-30.576-1.765-42.047-4.97c-11.953-3.339-15.846-7.03-16.341-8.158V249.79 c2.753,1.329,5.99,2.6,9.789,3.779c13.145,4.079,30.48,6.326,48.813,6.326s35.668-2.247,48.813-6.326 c3.607-1.12,6.7-2.323,9.361-3.58V265.522z M241.77,232.122c-1.03,1.42-5.223,4.758-16.127,7.804 c-11.471,3.205-26.403,4.97-42.047,4.97c-15.645,0-30.577-1.765-42.048-4.97c-12.171-3.399-15.994-7.171-16.373-8.224 c0.009,0.025,0.032,0.118,0.032,0.244h-0.214v-19.555c2.708,1.293,5.872,2.53,9.575,3.679c13.145,4.079,30.48,6.326,48.813,6.326 c18.333,0,35.668-2.247,48.813-6.326c3.703-1.149,6.867-2.387,9.575-3.679V232.122z M241.77,194.271 c-0.499,1.131-4.394,4.819-16.342,8.157c-11.471,3.204-26.403,4.969-42.047,4.969s-30.575-1.765-42.046-4.969 c-11.948-3.338-15.843-7.026-16.342-8.157v-17.524c2.708,1.293,5.872,2.53,9.575,3.68c13.145,4.079,30.479,6.326,48.813,6.326 s35.669-2.247,48.813-6.326c3.703-1.149,6.867-2.387,9.575-3.68V194.271z"></path>{" "}
          <path d="M24.575,159.029c13.145,4.079,30.48,6.326,48.813,6.326c7.223,0,14.336-0.349,21.143-1.036 c4.121-0.416,7.124-4.095,6.708-8.216c-0.417-4.121-4.097-7.128-8.216-6.708c-6.307,0.637-12.913,0.96-19.635,0.96 c-37.429,0-56.786-9.302-58.389-13.111v-17.54c2.708,1.293,5.872,2.53,9.575,3.68c13.145,4.079,30.48,6.326,48.813,6.326 s35.668-2.247,48.813-6.326c20.312-6.304,24.575-15.238,24.575-21.623s-4.264-15.319-24.575-21.623 c-13.145-4.079-30.479-6.326-48.813-6.326S37.72,76.06,24.575,80.139C4.264,86.442,0,95.377,0,101.762V208.66 c0,11.567,13.364,18.143,24.575,21.622c13.146,4.079,30.48,6.326,48.813,6.326c7.216,0,14.327-0.349,21.136-1.035 c4.121-0.415,7.125-4.094,6.709-8.215c-0.415-4.121-4.088-7.135-8.215-6.709c-6.31,0.637-12.914,0.959-19.63,0.959 c-37.427,0-56.785-9.301-58.389-13.11v-15.765c3.197,1.547,6.582,2.798,9.79,3.794c13.145,4.079,30.48,6.326,48.813,6.326 c6.867,0,13.649-0.315,20.159-0.938c4.123-0.395,7.146-4.057,6.752-8.18c-0.395-4.124-4.075-7.149-8.18-6.752 c-6.037,0.577-12.34,0.87-18.731,0.87c-37.438,0-56.796-9.307-58.39-13.113c-0.012-0.552-0.088-1.086-0.213-1.603V155.34 C18.134,156.839,21.438,158.056,24.575,159.029z M31.341,93.782c11.471-3.205,26.403-4.97,42.048-4.97 c15.644,0,30.576,1.765,42.047,4.97c11.364,3.175,15.45,6.673,16.251,7.979c-0.801,1.307-4.887,4.805-16.251,7.979 c-11.471,3.205-26.403,4.97-42.047,4.97c-15.645,0-30.577-1.765-42.048-4.97c-11.364-3.175-15.45-6.673-16.251-7.979 C15.891,100.455,19.977,96.957,31.341,93.782z"></path>{" "}
          <path d="M342.888,80.139c-13.145-4.079-30.48-6.326-48.813-6.326s-35.668,2.247-48.813,6.326 c-20.312,6.304-24.575,15.238-24.575,21.623s4.264,15.319,24.575,21.623c13.145,4.079,30.479,6.326,48.813,6.326 s35.669-2.247,48.813-6.326c3.703-1.149,6.867-2.387,9.575-3.68v17.54c-1.603,3.809-20.959,13.111-58.389,13.111 c-6.722,0-13.328-0.323-19.635-0.96c-4.138-0.422-7.8,2.588-8.216,6.708c-0.416,4.121,2.587,7.8,6.708,8.216 c6.807,0.688,13.92,1.036,21.143,1.036c18.333,0,35.669-2.247,48.813-6.326c3.137-0.973,6.441-2.19,9.575-3.689v17.798 c-0.125,0.516-0.201,1.051-0.213,1.603c-1.594,3.807-20.952,13.113-58.39,13.113c-6.392,0-12.694-0.293-18.731-0.87 c-4.104-0.392-7.785,2.628-8.18,6.752c-0.395,4.123,2.629,7.785,6.752,8.18c6.51,0.623,13.292,0.938,20.159,0.938 c18.332,0,35.668-2.247,48.813-6.326c3.208-0.996,6.593-2.247,9.79-3.794v15.765c-1.604,3.809-20.961,13.11-58.389,13.11 c-6.716,0-13.32-0.322-19.63-0.959c-4.127-0.427-7.8,2.588-8.215,6.709c-0.416,4.121,2.588,7.8,6.709,8.215 c6.809,0.687,13.92,1.035,21.136,1.035c18.333,0,35.668-2.247,48.813-6.326c11.211-3.479,24.575-10.055,24.575-21.622V101.762 C367.463,95.377,363.199,86.442,342.888,80.139z M336.122,109.741c-11.471,3.205-26.403,4.97-42.048,4.97 c-15.644,0-30.576-1.765-42.047-4.97c-11.364-3.175-15.45-6.673-16.251-7.979c0.801-1.307,4.887-4.805,16.251-7.979 c11.471-3.205,26.403-4.97,42.047-4.97c15.645,0,30.577,1.765,42.048,4.97c11.364,3.175,15.45,6.673,16.251,7.979 C351.572,103.068,347.486,106.566,336.122,109.741z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};