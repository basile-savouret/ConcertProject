<?php

namespace App\Entity;

use App\Repository\MemberRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MemberRepository::class)
 */
class Member
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("normalized")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("normalized")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("normalized")
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups("normalized")
     */
    private $job;

    /**
     * @ORM\Column(type="blob", nullable=true)
     */
    private $picture;

    /**
     * @ORM\ManyToMany(targetEntity=Band::class, inversedBy="members")
     */
    private $band;

    public function __construct()
    {
        $this->band = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getJob(): ?string
    {
        return $this->job;
    }

    public function setJob(string $job): self
    {
        $this->job = $job;

        return $this;
    }

    public function getPicture()
    {
        return $this->picture;
    }

    public function setPicture($picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * @return Collection|Band[]
     */
    public function getBand(): Collection
    {
        return $this->band;
    }

    public function addBand(Band $band): self
    {
        if (!$this->band->contains($band)) {
            $this->band[] = $band;
        }

        return $this;
    }

    public function removeBand(Band $band): self
    {
        $this->band->removeElement($band);

        return $this;
    }
}
