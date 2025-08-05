"use client";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from "@headlessui/react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/20/solid";
import {
  AcademicCapIcon,
  Bars3Icon,
  CalendarDaysIcon,
  ClockIcon,
  TicketIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const museumCollections = [
  {
    name: "Collections permanentes",
    description: "Découvrez nos trésors d'histoires fantastiques",
    href: "/collections",
    icon: AcademicCapIcon,
  },
  {
    name: "Expositions temporaires",
    description: "Nos événements spéciaux et installations interactives",
    href: "/expositions",
    icon: CalendarDaysIcon,
  },
  {
    name: "Ateliers créatifs",
    description: "Participez à nos ateliers d'écriture et de narration",
    href: "/ateliers",
    icon: UsersIcon,
  },
  {
    name: "Horaires & Tarifs",
    description: "Informations pratiques pour votre visite",
    href: "/infos-pratiques",
    icon: ClockIcon,
  },
];

const callsToAction = [
  { name: "Réserver une visite", href: "/reservation", icon: TicketIcon },
  { name: "Nous localiser", href: "/contact", icon: MapPinIcon },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <nav
        aria-label="Global"
        className={`mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-300 ${
          isScrolled ? "px-6 py-3 lg:px-8" : "p-6 lg:px-8"
        }`}
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">LE MUSÉE DE L&#39;AFFABULOSCOPE</span>
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-2xl"
              } font-bold text-brand`}
            >
              AFFABULOSCOPE
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <div className="relative group">
            <button className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-brand transition-colors">
              Visiter
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400 group-hover:text-brand group-hover:rotate-180 transition-all duration-200"
              />
            </button>

            {/* Zone invisible pour maintenir le hover entre le bouton et le dropdown */}
            <div className="absolute left-1/2 z-10 mt-1 w-screen max-w-md -translate-x-1/2 h-2 opacity-0 pointer-events-none group-hover:pointer-events-auto"></div>

            <div className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
              <div className="p-4">
                {museumCollections.map((item) => (
                  <div
                    key={item.name}
                    className="group/item relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover/item:bg-brand/10">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover/item:text-brand"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href={item.href}
                        className="block font-semibold text-gray-900 group-hover/item:text-brand"
                        prefetch={false}
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors"
                    prefetch={false}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/histoire"
            className="text-sm/6 font-semibold text-gray-900 hover:text-brand transition-colors"
            prefetch={false}
          >
            Notre Histoire
          </Link>
          <Link
            href="/evenements"
            className="text-sm/6 font-semibold text-gray-900 hover:text-brand transition-colors"
            prefetch={false}
          >
            Événements
          </Link>
          <Link
            href="/boutique"
            className="text-sm/6 font-semibold text-gray-900 hover:text-brand transition-colors"
            prefetch={false}
          >
            Boutique
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/80 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">LE MUSÉE DE L&#39;AFFABULOSCOPE</span>
              <div className="text-xl font-bold text-brand">AFFABULOSCOPE</div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors">
                    Visiter
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...museumCollections, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/histoire"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors"
                >
                  Notre Histoire
                </Link>
                <Link
                  href="/evenements"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors"
                >
                  Événements
                </Link>
                <Link
                  href="/boutique"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-brand/10 hover:text-brand transition-colors"
                >
                  Boutique
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold bg-brand text-white hover:bg-brand/80 transition-colors text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
